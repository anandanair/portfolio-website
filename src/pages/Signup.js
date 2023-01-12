import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Alert,
  Fade,
  CardMedia,
  CardHeader,
} from "@mui/material";
import { Email, Check, Password } from "@mui/icons-material";

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import pencilBackground from "../images/pencilBackground.jpg";
import logo from "../images/logo_transparent.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const signupFormRef = useRef(null);
  const signupImageRef = useRef(null);
  const [viewportHeight] = useState(window.innerHeight);
  const [isSmallSize, setIsSmallSize] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  async function handleSubmit() {
    setError("");
    setPasswordError("");
    if (password !== passwordConfirm) {
      return setPasswordError("Password do not match!");
    }
    try {
      setLoading(true);
      await signup(email, password);
    } catch (error) {
      console.log(error);
      setError("Failed to create an account!");
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
    const signupFormHeight = signupFormRef.current.offsetHeight;
    if (signupImageRef.current) {
      signupImageRef.current.style.height = `${signupFormHeight}px`;
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
                      ref={signupImageRef}
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
                        bottom: -280,
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
            <Card ref={signupFormRef} className="card">
              <CardHeader sx={{ mt: 5 }} title="Sign Up" />
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
                      type="email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Password sx={{ mr: 1 }} />
                    <TextField
                      required
                      type="password"
                      error={passwordError !== ""}
                      id="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Check sx={{ mr: 1 }} />
                    <TextField
                      required
                      type="password"
                      error={passwordError !== ""}
                      id="passwordConfirm"
                      label="Password Confirmation"
                      variant="outlined"
                      fullWidth
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      helperText={passwordError}
                    />
                  </Box>
                  <Button
                    disabled={loading}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ my: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>
                <div className="marginSpace normalText">
                  Already have an account?{" "}
                  <Link className="normalText" to="/login">
                    Log In
                  </Link>{" "}
                </div>
                {error && (
                  <Alert sx={{ mt: 5 }} severity="error">
                    {error}
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
