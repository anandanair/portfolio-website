import { Box } from "@mui/material";
import React from "react";
import CustomDraggableComponent from "../../components/CustomDraggableComponent";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useStorage } from "../../contexts/StorageContext";

export default function DesigndPage(props) {
  const properties = props.properties;
  const { firestoreUser } = useFirestore();
  const { defaultPhotoURL } = useStorage();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "80vh",
        background:
          properties.backgroundColorType === "static"
            ? properties.backgroundColor1
            : properties.backgroundColorType === "linear-gradient"
            ? `${properties.backgroundColorType}(
                ${properties.colorAngle}deg,
                ${properties.backgroundColor1},
                 ${properties.backgroundColor2}
              )`
            : `${properties.backgroundColorType}(at ${properties.colorXAxis}% ${properties.colorYAxis}%, ${properties.backgroundColor1}, ${properties.backgroundColor2})`,
      }}
    >
      <img
        src={firestoreUser.portfolio.primaryPhotoURL || defaultPhotoURL}
        height={properties.primaryImageHeight}
        width={properties.primaryImageWidth}
        alt="primary"
      />
    </Box>
  );
}
