import { Box } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useFirestore } from "../contexts/FirestoreContext";

export default function PublicPortfolio() {
  //Contexts
  const { handleData } = useFirestore();

  // render function
  function renderSwitch(child) {
    switch (child.type) {
      case "text":
        return (
          <div
            style={{
              position: "absolute",
              top: child.position.y,
              left: `${
                (child.position.x / handleData.parentDimensions.width) * 100
              }%`,
              width: `${
                (child.dimensions.width / handleData.parentDimensions.width) *
                100
              }%`,
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
            width={`${
              (child.dimensions.width / handleData.parentDimensions.width) * 100
            }%`}
            height={child.dimensions.height}
            src={child.value}
            style={{
              position: "absolute",
              top: child.position.y,
              left: `${
                (child.position.x / handleData.parentDimensions.width) * 100
              }%`,
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
              left: `${
                (child.position.x / handleData.parentDimensions.width) * 100
              }%`,
              backgroundColor: child.color,
              width: `${
                (child.dimensions.width / handleData.parentDimensions.width) *
                100
              }%`,
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
              left: `${
                (child.position.x / handleData.parentDimensions.width) * 100
              }%`,
              width: `${
                (child.dimensions.width / handleData.parentDimensions.width) *
                100
              }%`,
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
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        overflowY: "auto",
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
      {Object.keys(handleData.children).map((key, index) =>
        renderSwitch(handleData.children[key])
      )}
    </Box>
  );
}
