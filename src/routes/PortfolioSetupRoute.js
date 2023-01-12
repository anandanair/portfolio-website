import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFirestore } from "../contexts/FirestoreContext";

export const PortfolioSetupRoute = () => {
  const { currentUser } = useAuth();
  const { firestoreUser } = useFirestore();

  return currentUser ? (
    !firestoreUser.portfolioDone ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
};
