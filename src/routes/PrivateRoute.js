import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFirestore } from "../contexts/FirestoreContext";

export const PrivateRoute = () => {
  const { currentUser } = useAuth();
  const { firestoreUser } = useFirestore();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return currentUser ? (
    firestoreUser.portfolioDone ? (
      <Outlet />
    ) : (
      <Navigate to="/create-portfolio" />
    )
  ) : (
    <Navigate to="/login" />
  );
};
