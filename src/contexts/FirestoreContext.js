import React, { useContext, useEffect, useRef, useState } from "react";
import { firestore } from "../firebase";
import {
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { useLocalTheme } from "./ThemeContext";
import { Box, CircularProgress } from "@mui/material";

const FirestoreContext = React.createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const { currentUser, verifyEmail } = useAuth();
  const [firestoreUser, setFirestoreUser] = useState();
  const { setTheme, localTheme } = useLocalTheme();
  const [skills, setSkills] = useState([]);
  const [handleData, setHandleData] = useState({});
  const userUnsubcribe = useRef(null);

  async function setUser(user) {
    const userObj = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerData: user.providerData,
      theme: "dark",
      portfolioDone: false,
    };
    try {
      await setDoc(doc(firestore, "users", user.uid), userObj);
      getUser();
      console.log("Document written with ID: ", user.uid);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async function getVerifyEmailSendTime(user) {
    const docRef = await getDoc(doc(firestore, "users", user.uid));
    return docRef.data().emailVerificationSendTime;
  }

  function getUser() {
    userUnsubcribe.current = onSnapshot(
      doc(firestore, "users", currentUser.uid),
      (doc) => {
        setFirestoreUser(doc.data());
        setLoading(false);
        return doc.data();
      }
    );
  }

  async function createPortfolio(portfolio) {
    setLoading(true);
    let newObject = Object.assign({}, portfolio);
    newObject.createdAt = serverTimestamp();
    newObject.primaryPhotoURL = "";
    await updateUser("portfolio", newObject);
    await createPortfolioDesign();
    return await updateUser("portfolioDone", true);
  }

  async function createPortfolioDesign() {
    let newObject = {
      backgroundColorType: "linear-gradient",
      backgroundColor1: "black",
      backgroundColor2: "blue",
      colorAngle: 110,
      colorPosition: "circle at center",
      colorXAxis: 0,
      colorYAxis: 0,
      fontFamily: "'Antic Slab', serif",
      children: {},
    };
    updateUser("design", newObject);
    return newObject;
  }

  async function updateUser(name, value) {
    await updateDoc(doc(firestore, "users", currentUser.uid), {
      [name]: value,
    });
  }

  async function getSkills(searchText, stop) {
    const searchResults = [];
    const q = query(
      collection(firestore, "skills"),
      where("id", ">=", searchText),
      where("id", "<", searchText + "\uf8ff")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          searchResults.push(change.doc.data());
        }
        if (change.type === "modified") {
          searchResults.forEach((searchResult, index) => {
            if (searchResult.id === change.doc.id) {
              searchResults[index] = change.doc.data();
            }
          });
        }
        if (change.type === "removed") {
          searchResults.forEach((searchResult, index) => {
            if (searchResult.id === change.doc.id) {
              searchResults.splice(index, 1);
            }
          });
        }
      });
      setSkills(searchResults);
    });
    if (stop) {
      //Stop listening
      unsubscribe();
    }
  }

  async function addSkill(skill) {
    return await addDoc(collection(firestore, "skills"), skill);
  }

  async function updatePortfolio(value, name) {
    await updateUser(`portfolio.${name}`, value);
    return;
  }

  async function createHandle(handle, properties) {
    let response = {};

    //Check if user has already created a handle
    if (firestoreUser.handle) {
      response.error = false;
      response.message = "You have already created a handle!";
      return response;
    }

    //Check if a handle already exists with same name
    const firestoreHandle = await getDoc(doc(firestore, "handles", handle));
    if (firestoreHandle.exists()) {
      response.error = true;
      response.message = "Handle already exists!";
      return response;
    }

    //Add handle to firestore
    await updateUser("design", properties);
    await setDoc(doc(firestore, "handles", handle), properties);
    await updateUser("handle", handle);
    response.error = false;
    response.message = "Handle successfully created!";
    return response;
  }

  async function updatePublish(properties) {
    await updateUser("design", properties);
    await setDoc(doc(firestore, "handles", firestoreUser.handle), properties);
    const response = {
      error: false,
      message: "Latest changes published successfully!.",
    };
    return response;
  }

  async function getHandle(handle) {
    console.log("getting handle");
    const firestoreHandle = await getDoc(doc(firestore, "handles", handle));
    if (firestoreHandle.exists()) {
      setHandleData(firestoreHandle.data());
    }
    return firestoreHandle;
  }

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      (async () => {
        const user = await getDoc(doc(firestore, "users", currentUser.uid));
        if (!user.exists()) {
          //When user sign up for first time
          await setUser(currentUser);
          if (!currentUser.emailVerified) {
            await verifyEmail();
            await updateUser("emailVerificationSendTime", serverTimestamp());
          }
        } else {
          //When user is already logging in
          getUser();
        }
      })();
    } else {
      //Calls only if user is not logged in
      setLoading(false);
    }

    // this now gets called when the component unmounts
    return () => {
      if (userUnsubcribe.current) {
        userUnsubcribe.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  //Runs whenever User data in firestore changes
  useEffect(() => {
    if (firestoreUser) {
      if (firestoreUser.theme !== localTheme) {
        setTheme(firestoreUser.theme);
      }
    }

    return () => {
      // second
    };
  }, [firestoreUser, localTheme, setTheme]);

  const value = {
    getVerifyEmailSendTime,
    firestoreUser,
    getSkills,
    skills,
    setSkills,
    addSkill,
    createPortfolio,
    updatePortfolio,
    updateUser,
    createPortfolioDesign,
    createHandle,
    updatePublish,
    getHandle,
    handleData,
  };
  return (
    <FirestoreContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </FirestoreContext.Provider>
  );
}
