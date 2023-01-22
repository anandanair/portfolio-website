import { Box, CircularProgress } from "@mui/material";
import {
  getDownloadURL,
  list,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
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
  const [images, setImages] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [pageTokens, setPageTokens] = useState([]);

  //provide any image name and will get the url
  async function getDefaultImageURL(path, imageName) {
    return await getDownloadURL(ref(storage, `${path}/${imageName}`));
  }

  //upload image to users specified collection with the specified file name
  async function uploadImageFile(file, fileName, progressCallback) {
    const path = `users/${currentUser.uid}/images`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      //Listener for progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressCallback(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          const imageURL = await getDefaultImageURL(path, fileName);
          resolve(imageURL);
        }
      );
    });
  }

  async function getImages(token, page) {
    const listRef = ref(storage, `users/${currentUser.uid}/images`);
    setImages([]);

    if (!token || page === 0) {
      const firstPage = await list(listRef, { maxResults: 5 });
      // Use the first page results
      // Get all images download URL
      firstPage.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((downloadURL) => {
          setImages((prevState) => [...prevState, downloadURL]);
        });
      });
      if (!pageTokens[0]) {
        if (firstPage.nextPageToken) {
          setPageTokens((prevState) => [...prevState, firstPage.nextPageToken]);
        }
      }
    }
    if (token) {
      //Next Page
      const nextPage = await list(listRef, {
        maxResults: 5,
        pageToken: token,
      });
      if (!pageTokens[page]) {
        if (nextPage.nextPageToken) {
          setPageTokens((prevState) => [...prevState, nextPage.nextPageToken]);
        }
      }
      // Use the second page results
      nextPage.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((downloadURL) => {
          setImages((prevState) => [...prevState, downloadURL]);
        });
      });
    }
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

  const value = {
    defaultPhotoURL,
    uploadImageFile,
    getImages,
    images,
    pageTokens,
  };
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
