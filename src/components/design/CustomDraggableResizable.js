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
      onStop={(event, data) => props.onDragStop(data, "primaryImagePosition")}
      position={props.imagePosition}
      grid={[25, 25]}
    >
      <Box
        ref={nodeRef}
        sx={{
          display: "inline-block",
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
            borderRadius: `${props.imageProperties.borderRadius}px`,
            opacity: props.imageProperties.opacity / 100,
            border: `${props.imageProperties.borderThickness}px ${props.imageProperties.borderType} ${props.imageProperties.borderColor}`,
          }}
          onResizeStop={props.onResizeStop}
          onResizeStart={handleResizeStart}
        ></Resizable>
      </Box>
    </Draggable>
  );
}
