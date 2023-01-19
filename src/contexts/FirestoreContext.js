import React, { useContext, useEffect, useState } from "react";
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

  async function updateEmailVerification(user) {
    await updateDoc(doc(firestore, "users", user.uid), {
      emailVerificationSendTime: serverTimestamp(),
    });
    return;
  }

  async function getVerifyEmailSendTime(user) {
    const docRef = await getDoc(doc(firestore, "users", user.uid));
    return docRef.data().emailVerificationSendTime;
  }

  function getUser() {
    const unsubscribe = onSnapshot(
      doc(firestore, "users", currentUser.uid),
      (doc) => {
        setFirestoreUser(doc.data());
        setLoading(false);
        return doc.data();
      }
    );
  }

  async function updateTheme(user, currentTheme) {
    await updateDoc(doc(firestore, "users", user.uid), {
      theme: currentTheme,
    });
    return;
  }

  async function createPortfolio(portfolio) {
    setLoading(true);
    let newObject = Object.assign({}, portfolio);
    newObject.createdAt = serverTimestamp();
    newObject.primaryPhotoURL = "";
    await updateDoc(doc(firestore, "users", currentUser.uid), {
      portfolio: newObject,
    });
    await createPortfolioDesign(newObject);
    return await updatePortfolioDone();
  }

  async function createPortfolioDesign(portfolio) {
    let newObject = {
      backgroundColorType: "linear-gradient",
      backgroundColor1: "black",
      backgroundColor2: "blue",
      colorAngle: 110,
      colorPosition: "circle at center",
      colorXAxis: 0,
      colorYAxis: 0,
      fontFamily: "'Antic Slab', serif",
    };
    newObject.primaryImage = {
      dimensions: { width: 200, height: 200 },
      position: { x: 195, y: 150 },
      borderRadius: 20,
      opacity: 100,
      borderThickness: 5,
      borderType: "solid",
      borderColor: "white",
    };
    newObject.name = {
      fontSize: 72,
      position: { x: 415, y: 150 },
      opacity: 100,
      color: "white",
    };
    if (portfolio.summary !== "") {
      newObject.summary = {
        fontSize: 16,
        position: { x: 415, y: 245 },
        dimensions: { width: 700, height: 150 },
        opacity: 100,
        color: "white",
      };
    }
    for (let index in portfolio.workExperience) {
      newObject[portfolio.workExperience[index].id] = {
        titleFontSize: 24,
        titleTextColor: "white",
        roleFontSize: 20,
        roleTextColor: "white",
        descriptionFontSize: 16,
        descriptionTextColor: "white",
        position: { x: 195 + index * 450, y: 420 },
        dimensions: { width: 300, height: 300 },
        opacity: 100,
        backgroundColor1: "black",
        backgroundColor2: "blue",
        colorAngle: 110,
        backgroundColorType: "linear-gradient",
        colorXAxis: 0,
        colorYAxis: 0,
        borderRadius: 20,
      };
    }
    await updateDoc(doc(firestore, "users", currentUser.uid), {
      design: newObject,
    });
  }

  async function updatePortfolioDone() {
    await updateDoc(doc(firestore, "users", currentUser.uid), {
      portfolioDone: true,
    });
    return;
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
    const docRef = doc(firestore, "users", currentUser.uid);
    await updateDoc(docRef, {
      [`portfolio.${name}`]: value,
    });
    return;
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
            await updateEmailVerification(currentUser);
          }
        } else {
          //When user is already logging in
          getUser();
        }
      })();
    } else {
      setLoading(false);
    }

    return () => {
      // this now gets called when the component unmounts
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
  }, [firestoreUser]);

  const value = {
    updateEmailVerification,
    getVerifyEmailSendTime,
    updateTheme,
    firestoreUser,
    getSkills,
    skills,
    setSkills,
    addSkill,
    createPortfolio,
    updatePortfolioDone,
    updatePortfolio,
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
