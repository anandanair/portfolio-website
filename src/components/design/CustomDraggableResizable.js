import { Box } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export default function CustomDraggableResizable(props) {
  const nodeRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
  });

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

  const handleResizeStop = (e, direction, ref, d) => {
    setChildWidth(childWidth + d.width);
    props.onResizeStop(d, `${props.id}`);
  };

  //Call on initialization
  useEffect(() => {
    const componentWidth = nodeRef.current.offsetWidth;
    const boxWidth = props.boxRef.current.offsetWidth;
    setParentWidth(boxWidth);
    setChildWidth(componentWidth);
  }, []);

  //call whenever childWidth value changes
  useEffect(() => {
    setBounds((prevState) => {
      return {
        ...prevState,
        right: parentWidth - childWidth,
      };
    });
  }, [childWidth]);

  return (
    <Draggable
      nodeRef={nodeRef}
      // bounds="parent"
      bounds={bounds}
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
          onResizeStop={handleResizeStop}
          onResizeStart={handleResizeStart}
        >
          {props.children}
        </Resizable>
      </Box>
    </Draggable>
  );
}
