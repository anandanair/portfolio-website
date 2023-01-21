import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export default function EditPage({ properties, zoomValue, handleZoom }) {
  // Refs
  const boxRef = useRef(null);
  const parentBoxRef = useRef(null);

  //States
  const [scrollOrigin, setScrollOrigin] = useState({ left: 0, top: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  //Functions
  const handleWheel = (event) => {
    // get bounding values of the DIV
    const child = event.currentTarget;
    const { left, top } = child.getBoundingClientRect();

    //Get Top and Left values relative to the div
    const leftRelativeToChild = parseInt(event.clientX - left);
    const topRelativeToChild = parseInt(event.clientY - top);

    //control key is pressed
    if (event.ctrlKey) {
      event.preventDefault();

      setScrollOrigin({ left: leftRelativeToChild, top: topRelativeToChild });
      if (event.deltaY > 0) {
        //scrolled down
        handleZoom(zoomValue - 10);
      } else {
        //scrolled up
        handleZoom(zoomValue + 10);
      }
    }
  };

  const disableWheel = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };

  //Add Event Listener
  useEffect(() => {
    const element = boxRef.current;
    const parentElement = parentBoxRef.current;
    if (element && parentElement) {
      element.addEventListener("wheel", handleWheel, {
        capture: true,
        passive: false,
      });
      parentElement.addEventListener("wheel", disableWheel, { passive: false });
    }

    return () => {
      if (element && parentElement) {
        element.removeEventListener("wheel", handleWheel);
        parentElement.removeEventListener("wheel", disableWheel);
      }
    };
  }, [handleWheel]);

  return (
    // Parent Box which is only a background
    <Box
      ref={parentBoxRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        overflowY: "auto",
        height: "100%",
        background:
          properties.backgroundColorType === "static"
            ? properties.backgroundColor1
            : properties.backgroundColorType === "linear-gradient"
            ? `${properties.backgroundColorType}(
              ${properties.colorAngle}deg,
              ${properties.backgroundColor1},
               ${properties.backgroundColor2}
            )`
            : `${properties.backgroundColorType}(at 
                ${properties.colorXAxis}% 
                ${properties.colorYAxis}%, 
                ${properties.backgroundColor1}, 
                ${properties.backgroundColor2})`,
      }}
    >
      {/* Child Box which contains the draggable component */}
      <Box
        ref={boxRef}
        style={{
          transform: `scale(${zoomValue / 100})`,
          transformOrigin:
            zoomValue === 100
              ? "center"
              : `${scrollOrigin.top}px ${scrollOrigin.left}px`,
        }}
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          cursor: zoomValue !== 100 && "pointer",
        }}
      ></Box>
    </Box>
  );
}
