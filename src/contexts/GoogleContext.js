import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

const GoogleContext = React.createContext();

export function useGoogle() {
  return useContext(GoogleContext);
}

export function GoogleProvider({ children }) {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getGoogleFonts() {
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const allFonts = data.items;
        setGoogleFonts(allFonts);
        setLoading(false);
      });
  }

  //   useEffect(() => {
  //     getGoogleFonts();
  //   }, []);

  const value = { googleFonts };
  return (
    <GoogleContext.Provider value={value}>
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
    </GoogleContext.Provider>
  );
}
