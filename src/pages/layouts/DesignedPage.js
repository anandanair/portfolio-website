import { Box, Card, CardContent } from "@mui/material";
import React, { useRef, useState } from "react";
import CustomTextArea from "../../components/CustomTextArea";
import CustomDraggableResizable from "../../components/design/CustomDraggableResizable";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useStorage } from "../../contexts/StorageContext";

export default function DesignedPage(props) {
  const properties = props.properties;
  const { firestoreUser, updatePortfolio } = useFirestore();
  const { defaultPhotoURL } = useStorage();
  const boxRef = useRef();
  const [editable, setEditable] = useState("");

  const handleResizeStop = (data, name) => {
    const newWdith = properties[name].dimensions.width + data.width;
    const newHeight = properties[name].dimensions.height + data.height;
    props.onResize(newWdith, newHeight, name);
  };

  const handleDragStop = (data, name) => {
    props.onDrag(data.x, data.y, name);
  };

  function handleClick(id) {
    setEditable(id);
    props.onClick(id);
  }

  async function handleDone(value, name) {
    updatePortfolio(value, name);
    setEditable("");
  }

  return (
    <Box
      ref={boxRef}
      sx={{
        position: "relative",
        height: "100%",
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
        transform: `scale(${props.zoomValue / 100})`,
      }}
    >
      {/* Draggable and Resizable Image Component */}
      <CustomDraggableResizable
        component="image"
        id="primaryImage"
        onDragStop={handleDragStop}
        properties={properties.primaryImage}
        imageURL={firestoreUser.portfolio.primaryPhotoURL || defaultPhotoURL}
        dynamicColor={properties.backgroundColor1}
        onResizeStop={handleResizeStop}
        boxRef={boxRef}
        onClick={handleClick}
        onRightClick={props.onUpdate}
      />

      {/* Draggable Name Component */}
      <CustomDraggableResizable
        component="text"
        id="name"
        onDragStop={handleDragStop}
        properties={properties.name}
        dynamicColor={properties.backgroundColor1}
        onResizeStop={handleResizeStop}
        boxRef={boxRef}
        onClick={handleClick}
        editable={editable === "name"}
        onRightClick={props.onUpdate}
      >
        {editable === "name" ? (
          <CustomTextArea
            value={firestoreUser.portfolio.fullName}
            height={properties.name.dimensions.height}
            width={properties.name.dimensions.width}
            bgColor={properties.backgroundColor1}
            fontSize={properties.name.fontSize}
            onDone={(value) => handleDone(value, "fullName")}
          />
        ) : (
          <div
            style={{
              fontFamily: properties.fontFamily,
              color: properties.name.color,
              fontSize: properties.name.fontSize,
              opacity: properties.name.opacity / 100,
              textAlign: "left",
            }}
          >
            {firestoreUser.portfolio.fullName}
          </div>
        )}
      </CustomDraggableResizable>

      {/* Draggable and Resizable Summary Component */}
      <CustomDraggableResizable
        component="text"
        id="summary"
        onDragStop={handleDragStop}
        properties={properties.summary}
        dynamicColor={properties.backgroundColor1}
        onResizeStop={handleResizeStop}
        boxRef={boxRef}
        onClick={handleClick}
        editable={editable === "summary"}
        onRightClick={props.onUpdate}
      >
        {editable === "summary" ? (
          <CustomTextArea
            value={firestoreUser.portfolio.summary}
            height={properties.summary.dimensions.height}
            width={properties.summary.dimensions.width}
            bgColor={properties.backgroundColor1}
            fontSize={properties.summary.fontSize}
            onDone={(value) => handleDone(value, "summary")}
          />
        ) : (
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
        )}
      </CustomDraggableResizable>

      {/* Loop - Draggable and Resizable Work Experience Component */}
      {firestoreUser.portfolio.workExperience.map((exp, index) => (
        <CustomDraggableResizable
          component="card"
          id={exp.id}
          onDragStop={handleDragStop}
          properties={properties[exp.id]}
          dynamicColor={properties.backgroundColor1}
          onResizeStop={handleResizeStop}
          key={index}
          boxRef={boxRef}
          onClick={handleClick}
          onRightClick={props.onUpdate}
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
