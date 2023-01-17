import { Box, Card, CardContent } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import CustomDraggableResizable from "../../components/design/CustomDraggableResizable";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useStorage } from "../../contexts/StorageContext";

export default function DesignedPage(props) {
  const properties = props.properties;
  const { firestoreUser } = useFirestore();
  const { defaultPhotoURL } = useStorage();
  const boxRef = useRef();
  const nameRef = useRef();
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
  });

  const handleResizeStop = (data, name) => {
    const newWdith = properties[name].dimensions.width + data.width;
    const newHeight = properties[name].dimensions.height + data.height;
    props.onResize(newWdith, newHeight, name);
  };

  const handleDragStop = (data, name) => {
    props.onDrag(data.x, data.y, name);
  };

  useEffect(() => {
    const boxWidth = boxRef.current.offsetWidth;
    const nameWidth = nameRef.current.offsetWidth;
    setBounds((prevState) => {
      return { ...prevState, right: boxWidth - nameWidth };
    });
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: "relative",
        height: "77vh",
        overflow: "auto",
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
        component="image"
        id="primaryImage"
        onDragStop={handleDragStop}
        position={properties.primaryImage.position}
        dimensions={properties.primaryImage.dimensions}
        imageProperties={properties.primaryImage}
        imageURL={firestoreUser.portfolio.primaryPhotoURL || defaultPhotoURL}
        onResizeStop={handleResizeStop}
        boxRef={boxRef}
      />
      <Draggable
        grid={[5, 5]}
        nodeRef={nameRef}
        position={properties.name.position}
        onStop={(event, data) => handleDragStop(data, "name")}
        bounds={bounds}
      >
        <div
          className="textContent"
          style={{
            fontFamily: properties.fontFamily,
            color: properties.name.color,
            fontSize: properties.name.fontSize,
            position: "absolute",
            opacity: properties.name.opacity / 100,
            cursor: "pointer",
          }}
          ref={nameRef}
        >
          I'm {firestoreUser.portfolio.fullName}
        </div>
      </Draggable>
      <CustomDraggableResizable
        component="text"
        id="summary"
        onDragStop={handleDragStop}
        position={properties.summary.position}
        dimensions={properties.summary.dimensions}
        imageProperties={{}}
        imageURL=""
        onResizeStop={handleResizeStop}
        boxRef={boxRef}
      >
        <div
          style={{
            fontFamily: properties.fontFamily,
            color: properties.summary.color,
            fontSize: properties.summary.fontSize,
            opacity: properties.summary.opacity / 100,
            textAlign: "left",
          }}
        >
          {firestoreUser.portfolio.summary}
        </div>
      </CustomDraggableResizable>
      {firestoreUser.portfolio.workExperience.map((exp, index) => (
        <CustomDraggableResizable
          component="card"
          id={exp.id}
          onDragStop={handleDragStop}
          position={properties[exp.id].position}
          dimensions={properties[exp.id].dimensions}
          imageProperties={{}}
          imageURL=""
          onResizeStop={handleResizeStop}
          key={index}
          boxRef={boxRef}
        >
          <Card
            sx={{
              position: "absolute",
              width: `${properties[exp.id].dimensions.width}px`,
              height: `${properties[exp.id].dimensions.height}px`,
              background:
                properties[exp.id].backgroundColorType === "static"
                  ? properties[exp.id].backgroundColor1
                  : properties[exp.id].backgroundColorType === "linear-gradient"
                  ? `${properties[exp.id].backgroundColorType}(
                ${properties[exp.id].colorAngle}deg,
                ${properties[exp.id].backgroundColor1},
                 ${properties[exp.id].backgroundColor2}
              )`
                  : `${properties[exp.id].backgroundColorType}(at ${
                      properties[exp.id].colorXAxis
                    }% ${properties[exp.id].colorYAxis}%, ${
                      properties[exp.id].backgroundColor1
                    }, ${properties[exp.id].backgroundColor2})`,
              borderRadius: `${properties[exp.id].borderRadius}px`,
              opacity: properties[exp.id].opacity / 100,
            }}
          >
            <CardContent>
              <div
                style={{
                  fontFamily: properties.fontFamily,
                  color: properties[exp.id].roleTextColor,
                  fontSize: properties[exp.id].roleFontSize,
                  textAlign: "center",
                }}
              >
                {exp.position}
              </div>
              <div
                style={{
                  fontFamily: properties.fontFamily,
                  color: properties[exp.id].titleTextColor,
                  fontSize: properties[exp.id].titleFontSize,
                  textAlign: "center",
                }}
              >
                {exp.companyName}
              </div>
              <div
                style={{
                  fontFamily: properties.fontFamily,
                  color: properties[exp.id].descriptionTextColor,
                  fontSize: properties[exp.id].descriptionFontSize,
                  textAlign: "left",
                }}
              >
                {exp.description}
              </div>
            </CardContent>
          </Card>
        </CustomDraggableResizable>
      ))}
    </Box>
  );
}
