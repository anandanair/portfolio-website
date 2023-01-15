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
      onStop={(event, data) => props.onDragStop(data, `${props.id}`)}
      position={props.position}
      grid={[5, 5]}
    >
      <Box
        ref={nodeRef}
        sx={{
          height: props.dimensions.height + "px",
          width: props.dimensions.width + "px",
          cursor: "pointer",
          position: "absolute",
        }}
      >
        <Resizable
          className="textContent"
          size={props.dimensions}
          style={props.component === "image" && imageStyleProps}
          onResizeStop={(e, direction, ref, d) =>
            props.onResizeStop(d, `${props.id}`)
          }
          onResizeStart={handleResizeStart}
        >
          {props.children}
        </Resizable>
      </Box>
    </Draggable>
  );
}
