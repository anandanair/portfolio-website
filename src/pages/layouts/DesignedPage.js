import { Box, Typography } from "@mui/material";
import { width } from "@mui/system";
import React, { useRef } from "react";
import Draggable from "react-draggable";
import CustomDraggableResizable from "../../components/design/CustomDraggableResizable";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useStorage } from "../../contexts/StorageContext";

export default function DesignedPage(props) {
  const properties = props.properties;
  const { firestoreUser } = useFirestore();
  const { defaultPhotoURL } = useStorage();
  const nameRef = useRef();
  const summaryRef = useRef();

  const handleResizeStop = (e, direction, ref, d) => {
    const newWdith = properties.primaryImageDimensions.width + d.width;
    const newHeight = properties.primaryImageDimensions.height + d.height;
    props.onResize(newWdith, newHeight, "primaryImageDimensions");
  };

  const handleDragStop = (data, name) => {
    props.onDrag(data.x, data.y, name);
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
      <Draggable
        grid={[25, 25]}
        nodeRef={nameRef}
        position={properties.namePosition}
        onStop={(event, data) => handleDragStop(data, "namePosition")}
      >
        <Typography ref={nameRef} sx={{ display: "inline-block" }} variant="h2">
          I'm {firestoreUser.portfolio.fullName}
        </Typography>
      </Draggable>
      <Draggable
        grid={[25, 25]}
        nodeRef={summaryRef}
        position={properties.summaryPosition}
        onStop={(event, data) => handleDragStop(data, "summaryPosition")}
      >
        <Typography
          ref={summaryRef}
          sx={{ display: "inline-block", textAlign: "left" }}
          variant="subtitle1"
        >
          {firestoreUser.portfolio.summary}
        </Typography>
      </Draggable>
    </Box>
  );
}
