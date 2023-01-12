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
  const { setTheme } = useLocalTheme();
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
      setFirestoreUser(userObj);
      setLoading(false);
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

  async function getUser() {
    const docRef = await getDoc(doc(firestore, "users", currentUser.uid));
    setFirestoreUser(docRef.data());
    setLoading(false);
    return docRef.data();
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
    return await updatePortfolioDone();
  }

  async function updatePortfolioDone() {
    await updateDoc(doc(firestore, "users", currentUser.uid), {
      portfolioDone: true,
    });
    return await getUser();
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
          const fUser = await getUser();
          setTheme(fUser.theme);
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
