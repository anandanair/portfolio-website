import { Box, Card, CardContent, Link } from "@mui/material";
import React from "react";
import bgImage from "../images/surrender_2.jpg";

export default function NoHandleFound({ handle }) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "60%",
          height: "90%",
          background: `linear-gradient(to bottom, var(--light-overlay-color), var(--dark-overlay-color)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50px",
        }}
      >
        <CardContent>
          <div
            style={{ fontSize: "8vw", textAlign: "left", marginBottom: "4vh" }}
          >
            :( Oops...
          </div>
          <div style={{ fontSize: "1.5vw", textAlign: "left" }}>
            The handle you are looking for is not found!
          </div>
          <div style={{ fontSize: "1.5vw", textAlign: "left" }}>
            Create your own handle! Go to{" "}
            <Link underline="hover" href="/login">
              Login
            </Link>{" "}
            page
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
