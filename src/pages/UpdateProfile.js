import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Alert,
} from "@mui/material";

import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { currentUser, updateEmailFunction, updatePasswordFunction } =
    useAuth();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit() {
    setError("");
    setPasswordError("");
    if (password !== passwordConfirm) {
      return setPasswordError("Password do not match!");
    }

    const promises = [];
    setLoading(true);
    if (email !== currentUser.email) {
      promises.push(updateEmailFunction(email));
    }
    if (password) {
      promises.push(updatePasswordFunction(password));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update profile!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="panel">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div>Testing</div>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent sx={{ mt: 10, mb: 10 }}>
              <h2>Update Profile</h2>

              <Box component="form" autoComplete="off" noValidate>
                <TextField
                  sx={{ mb: 2 }}
                  required
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  defaultValue={currentUser.email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  sx={{ mb: 2 }}
                  type="password"
                  error={passwordError !== ""}
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  placeholder="Leave blank to keep same"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  sx={{ mb: 2 }}
                  type="password"
                  error={passwordError !== ""}
                  id="passwordConfirm"
                  label="Password Confirmation"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Leave blank to keep same"
                  helperText={passwordError}
                />
                <Button
                  disabled={loading}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </Box>

              <div className="marginSpace">
                <Link to="/">Cancel</Link>{" "}
              </div>
              {error && <Alert severity="error">{error}</Alert>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
