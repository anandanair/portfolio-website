import { Box, CircularProgress } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { storage } from "../firebase";
import { useFirestore } from "./FirestoreContext";
import { useAuth } from "./AuthContext";

const StorageContext = React.createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const [defaultPhotoURL, setDefaultPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { updatePortfolio } = useFirestore();

  //provide any image name and will get the url
  async function getDefaultImageURL(path, imageName) {
    return await getDownloadURL(ref(storage, `${path}/${imageName}`));
  }

  //upload image to users specified collection with the specified file name
  async function uploadImageFile(file, fileName) {
    const path = `users/${currentUser.uid}/images`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    await uploadBytes(storageRef, file);
    const imageURL = await getDefaultImageURL(path, fileName);
    updatePortfolio(imageURL, "primaryPhotoURL");
  }

  useEffect(() => {
    (async () => {
      const url = await getDefaultImageURL(
        "default/images",
        "default_profile_picture.jpg"
      );
      setDefaultPhotoURL(url);
      setLoading(false);
    })();
  }, []);

  const value = { defaultPhotoURL, uploadImageFile };
  return (
    <StorageContext.Provider value={value}>
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
    </StorageContext.Provider>
  );
}
