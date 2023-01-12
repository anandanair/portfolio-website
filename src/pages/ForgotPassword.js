import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Alert,
  CardMedia,
  CardHeader,
  Fade,
} from "@mui/material";
import { Email } from "@mui/icons-material";

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import pencilBackground from "../images/pencilBackground.jpg";
import logo from "../images/logo_transparent.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const forgotFormRef = useRef(null);
  const forgotImageRef = useRef(null);
  const [viewportHeight] = useState(window.innerHeight);
  const [isSmallSize, setIsSmallSize] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  async function handleSubmit() {
    setError("");
    setMessage("");

    try {
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions!");
    } catch (error) {
      console.log(error);
      setError("Failed to reset password!");
    }
    setLoading(false);
  }

  //Run whenever width changes
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    syncHeight();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [width]);

  //Run once when mounted
  useEffect(() => {
    handleWindowSizeChange();
    syncHeight();
  }, []);

  function syncHeight() {
    const forgotFormHeight = forgotFormRef.current.offsetHeight;
    if (forgotImageRef.current) {
      forgotImageRef.current.style.height = `${forgotFormHeight}px`;
    }
    return;
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      return setIsSmallSize(true);
    }
    return setIsSmallSize(false);
  }

  return (
    <Box
      sx={{
        minHeight: `${((viewportHeight - 50) / viewportHeight) * 90}vh`,
        padding: "50px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {!isSmallSize && (
          <Fade in={!isSmallSize} timeout={1000}>
            <Grid item xs={4}>
              <Fade in={true} timeout={1000}>
                <Card
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    boxShadow: "1px 1px 20px #06203d59",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      ref={forgotImageRef}
                      component="img"
                      image={pencilBackground}
                      alt="Cover Image"
                    />
                    <CardMedia
                      component="img"
                      image={logo}
                      sx={{
                        position: "absolute",
                        textAlign: "center",
                        top: 0,
                        bottom: -110,
                        left: 1550 - width,
                        right: 0,
                        height: "fit-content",
                        margin: "auto",
                        backgroundColor: "white",
                        width: "150px",
                        borderRadius: 20,
                      }}
                    />
                  </Box>
                </Card>
              </Fade>
            </Grid>
          </Fade>
        )}
        <Grid item xs={!isSmallSize ? 4 : 12}>
          <Fade in={true} timeout={1000}>
            <Card ref={forgotFormRef} className="card">
              <CardHeader sx={{ mt: 5 }} title="Password Reset" />
              <CardContent>
                <Box
                  component="form"
                  autoComplete="off"
                  noValidate
                  sx={{ paddingLeft: 10, paddingRight: 10 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Email sx={{ mr: 1 }} />
                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>

                  <Button
                    disabled={loading}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ my: 2 }}
                  >
                    Reset Password
                  </Button>
                </Box>
                <Grid
                  container
                  sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}
                >
                  <Grid item xs={5}>
                    <Link className="normalText" to="/login">
                      Log In
                    </Link>
                  </Grid>
                  <Grid item xs={5}>
                    <div className="normalText">
                      Need an account?{" "}
                      <Link className="normalText" to="/signup">
                        Sign Up
                      </Link>
                    </div>
                  </Grid>
                </Grid>

                {error && (
                  <Alert sx={{ mt: 5 }} severity="error">
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert sx={{ mt: 5 }} severity="info">
                    {message}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
