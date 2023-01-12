import { Box, CircularProgress } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { storage } from "../firebase";

const StorageContext = React.createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const [defaultPhotoURL, setDefaultPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  async function getDefaultImageURL(imageName) {
    return await getDownloadURL(ref(storage, `default/images/${imageName}`));
  }

  useEffect(() => {
    (async () => {
      const url = await getDefaultImageURL("default_profile_picture.jpg");
      setDefaultPhotoURL(url);
      setLoading(false);
    })();
  }, []);

  const value = { defaultPhotoURL };
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
