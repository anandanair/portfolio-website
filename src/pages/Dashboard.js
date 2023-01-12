import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Alert, Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Security } from "@mui/icons-material";
import { useFirestore } from "../contexts/FirestoreContext";
import DrawerNavBar from "../components/DrawerNavBar";
import HomePage from "./layouts/HomePage";

export default function Dashboard() {
  const { currentUser, verifyEmail } = useAuth();
  const [timeLeft, setTimeLeft] = useState();
  const { updateEmailVerification, getVerifyEmailSendTime } = useFirestore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  async function resendVerificationEmail() {
    const timestamp = await getVerifyEmailSendTime(currentUser);
    const sendTime = new Date(timestamp.toDate());
    const now = new Date();
    const difference = now - sendTime;
    if (difference > 120000) {
      await verifyEmail();
      await updateEmailVerification(currentUser);
    } else {
      setTimeLeft(Math.trunc(120 - difference / 1000));
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!currentUser.emailVerified ? (
        <Card sx={{ mb: 5 }} className="card">
          <CardContent>
            <Alert
              icon={<Security className="alertIcon" fontSize="inherit" />}
              severity="info"
            >
              An email has been send to your email for verification. Please
              verify your account to continue. Click{" "}
              <Link onClick={() => window.location.reload()} to="/">
                here
              </Link>{" "}
              if you have already verified your account.
            </Alert>
            <Button
              onClick={() => resendVerificationEmail()}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Resend Email
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              message={`Please wait for ${timeLeft} seconds before requesting for another mail.`}
              onClose={handleClose}
            />
          </CardContent>
        </Card>
      ) : (
        <DrawerNavBar>
          <HomePage />
        </DrawerNavBar>
      )}
    </div>
  );
}
