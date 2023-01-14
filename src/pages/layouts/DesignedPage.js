import { Box } from "@mui/material";
import React, { useRef } from "react";
import CustomDraggableResizable from "../../components/design/CustomDraggableResizable";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useStorage } from "../../contexts/StorageContext";

export default function DesignedPage(props) {
  const properties = props.properties;
  const { firestoreUser } = useFirestore();
  const { defaultPhotoURL } = useStorage();

  const handleResizeStop = (e, direction, ref, d) => {
    const newWdith = properties.primaryImageDimensions.width + d.width;
    const newHeight = properties.primaryImageDimensions.height + d.height;
    props.onResize(newWdith, newHeight, "primaryImageDimensions");
  };

  const handleDragStop = (event, data) => {
    props.onDrag(data.x, data.y, "primaryImagePosition");
  };

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
      <CustomDraggableResizable
        onDragStop={handleDragStop}
        imagePosition={properties.primaryImagePosition}
        imageDimensions={properties.primaryImageDimensions}
        imageProperties={properties.primaryImageProperties}
        imageURL={firestoreUser.portfolio.primaryPhotoURL || defaultPhotoURL}
        onResizeStop={handleResizeStop}
      />
    </Box>
  );
}
