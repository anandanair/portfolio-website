import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../contexts/FirestoreContext";
import NoHandleFound from "../pages/NoHandleFound";

export default function PublicHandleRoute() {
  const { handle } = useParams();
  const [exists, setExists] = useState(null);
  const [verified, setVerified] = useState(false);

  //Contexts
  const { getHandle } = useFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const firestoreHandle = await getHandle(handle);
      setExists(firestoreHandle.exists());
      setVerified(true);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return verified ? (
    exists ? (
      <Outlet />
    ) : (
      <NoHandleFound handle={handle} />
    )
  ) : (
    <CircularProgress />
  );
}
