import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useFirestore } from "../contexts/FirestoreContext";

export default function PublicPortfolio() {
  //Contexts
  const { handleData } = useFirestore();

  // Ref
  const boxRef = useRef();

  // State
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    if (boxRef.current) {
      console.log("inside");
      const widthScale =
        boxRef.current.offsetWidth / handleData.parentDimensions.width;
      const heightScale =
        boxRef.current.offsetHeight / handleData.parentDimensions.height;
      setScaleFactor(Math.min(widthScale, heightScale));
    }
  }, [handleData, boxRef]);

  // render function
  function renderSwitch(child) {
    switch (child.type) {
      case "text":
        return (
          <div
            style={{
              position: "absolute",
              top: child.position.y,
              left: child.position.x,
              width: child.dimensions.width,
              height: child.dimensions.height,
              fontFamily: handleData.fontFamily,
              color: child.color,
              fontSize: child.fontSize,
              opacity: child.opacity / 100,
              textAlign: "left",
              zIndex: child.zIndex,
            }}
          >
            {child.value}
          </div>
        );
      case "image":
        return (
          <LazyLoadImage
            alt="image"
            effect="blur"
            width={child.dimensions.width}
            height={child.dimensions.height}
            src={child.value}
            style={{
              position: "absolute",
              top: child.position.y,
              left: child.position.x,
              objectFit: "cover",
              borderRadius: `${child.borderRadius}px`,
              opacity: child.opacity / 100,
              border: `${child.borderThickness}px ${child.borderType} ${child.borderColor}`,
              pointerEvents: "none",
              zIndex: child.zIndex,
            }}
          />
        );

      case "shape":
        return (
          <div
            style={{
              position: "absolute",
              top: child.position.y,
              left: child.position.x,
              backgroundColor: child.color,
              width: child.dimensions.width,
              height: child.dimensions.height,
              borderRadius: child.borderRadius,
              border: `${child.borderThickness}px ${child.borderType} ${child.borderColor}`,
              opacity: child.opacity / 100,
              zIndex: child.zIndex,
            }}
          ></div>
        );

      case "line":
        return (
          <div
            style={{
              position: "absolute",
              top: child.position.y,
              left: child.position.x,
              width: child.dimensions.width,
              height: child.thickness,
              backgroundColor: child.color,
              transform: `rotate(${child.rotate}deg)`,
              zIndex: child.zIndex,
            }}
          ></div>
        );
      default:
        break;
    }
  }

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "100vw",
        height: "100vh",
        background:
          handleData.backgroundColorType === "static"
            ? handleData.backgroundColor1
            : handleData.backgroundColorType === "linear-gradient"
            ? `${handleData.backgroundColorType}(
      ${handleData.colorAngle}deg,
      ${handleData.backgroundColor1},
       ${handleData.backgroundColor2}
    )`
            : `${handleData.backgroundColorType}(at 
        ${handleData.colorXAxis}% 
        ${handleData.colorYAxis}%, 
        ${handleData.backgroundColor1}, 
        ${handleData.backgroundColor2})`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: handleData.parentDimensions.height,
          width: handleData.parentDimensions.width,
          overflow: "hidden",
          overflowY: "auto",
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top left",
        }}
      >
        {Object.keys(handleData.children).map((key, index) => (
          <React.Fragment key={index}>
            {renderSwitch(handleData.children[key])}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
