import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Alert,
  Divider,
  Fade,
  IconButton,
  CardMedia,
  CardHeader,
  Typography,
} from "@mui/material";
import { Email, Password, Google, Facebook, Apple } from "@mui/icons-material";

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import pencilBackground from "../images/pencilBackground.jpg";
import logo from "../images/logo_transparent.png";
import { useLocalTheme } from "../contexts/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleSignIn, facebookSignIn } = useAuth();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const loginFormRef = useRef(null);
  const loginImageRef = useRef(null);
  const { viewportHeight, isSmallSize, width, handleWindowSizeChange } =
    useLocalTheme();

  async function handleSubmit() {
    setError("");
    setPasswordError("");

    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
      setError("Failed to sign in!");
    }
    setLoading(false);
  }

  //Run whenever width changes
  useEffect(() => {
    syncHeight();
  }, [width]);

  //Run once when mounted
  useEffect(() => {
    handleWindowSizeChange();
    syncHeight();
    // eslint-disable-next-line
  }, []);

  function syncHeight() {
    const loginFormHeight = loginFormRef.current.offsetHeight;
    if (loginImageRef.current) {
      loginImageRef.current.style.height = `${loginFormHeight}px`;
    }
    return;
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
                      ref={loginImageRef}
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
                        bottom: -350,
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
            <Card ref={loginFormRef} className="card">
              <CardHeader sx={{ mt: 5 }} title="Log In" />
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

                  <Button
                    disabled={loading}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ my: 2 }}
                  >
                    Log In
                  </Button>
                </Box>

                <Grid
                  container
                  sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}
                >
                  <Grid item xs={5}>
                    <Link to="/forgot-password">
                      <Typography>Forgot Password?</Typography>
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
                <Divider sx={{ my: 2 }} className="normalText">
                  OR
                </Divider>

                <div className="centerFlex">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "transparent",
                      "& svg": {
                        m: 1.5,
                      },
                      "& hr": {
                        mx: 0.5,
                      },
                    }}
                  >
                    <IconButton onClick={() => googleSignIn()}>
                      <Google style={{ color: "#4285F4", fontSize: 35 }} />
                    </IconButton>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <IconButton onClick={() => facebookSignIn()}>
                      <Facebook style={{ color: "#3b5998", fontSize: 35 }} />
                    </IconButton>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <IconButton>
                      <Apple style={{ color: "#555555", fontSize: 35 }} />
                    </IconButton>
                  </Box>
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
    // </div>
  );
}
