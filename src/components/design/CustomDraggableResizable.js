import { Box } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useRef } from "react";
import Draggable from "react-draggable";

export default function CustomDraggableResizable(props) {
  const nodeRef = useRef(null);

  const handleResizeStart = (event) => {
    event.stopPropagation();
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStop={props.onDragStop}
      position={props.imagePosition}
    >
      <Box
        ref={nodeRef}
        sx={{
          display: "flex",
          height: props.imageDimensions.height + "px",
          width: props.imageDimensions.width + "px",
        }}
      >
        <Resizable
          size={{
            height: props.imageDimensions.height,
            width: props.imageDimensions.width,
          }}
          style={{
            background: `url(${props.imageURL})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onResizeStop={props.onResizeStop}
          onResizeStart={handleResizeStart}
        ></Resizable>
      </Box>
    </Draggable>
  );
}
