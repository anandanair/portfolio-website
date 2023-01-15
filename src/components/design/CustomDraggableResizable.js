import { Box } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useRef } from "react";
import Draggable from "react-draggable";

export default function CustomDraggableResizable(props) {
  const nodeRef = useRef(null);

  const handleResizeStart = (event) => {
    event.stopPropagation();
  };

  const imageStyleProps = {
    background: `url(${props.imageURL})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: `${props.imageProperties.borderRadius}px`,
    opacity: props.imageProperties.opacity / 100,
    border: `${props.imageProperties.borderThickness}px ${props.imageProperties.borderType} ${props.imageProperties.borderColor}`,
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStop={(event, data) => props.onDragStop(data, `${props.id}Position`)}
      position={props.position}
      grid={[25, 25]}
    >
      <Box
        ref={nodeRef}
        sx={{
          display: "inline-block",
          height: props.dimensiones.height + "px",
          width: props.dimensiones.width + "px",
        }}
      >
        <Resizable
          size={props.dimensiones}
          style={props.component === "image" && imageStyleProps}
          onResizeStop={(e, direction, ref, d) =>
            props.onResizeStop(d, `${props.id}Dimensions`)
          }
          onResizeStart={handleResizeStart}
        >
          {props.children}
        </Resizable>
      </Box>
    </Draggable>
  );
}
