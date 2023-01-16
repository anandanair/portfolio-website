import { Box, Card, CardContent } from "@mui/material";
import React, { useRef } from "react";
import Draggable from "react-draggable";
import CustomDraggableResizable from "../../components/design/CustomDraggableResizable";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useStorage } from "../../contexts/StorageContext";

export default function DesignedPage(props) {
  const properties = props.properties;
  const { firestoreUser } = useFirestore();
  const { defaultPhotoURL } = useStorage();
  const nameRef = useRef();
  const summaryRef = useRef();

  const handleResizeStop = (data, name) => {
    const newWdith = properties[name].dimensions.width + data.width;
    const newHeight = properties[name].dimensions.height + data.height;
    props.onResize(newWdith, newHeight, name);
  };

  const handleDragStop = (data, name) => {
    props.onDrag(data.x, data.y, name);
  };
  return (
    <Box
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
      />
      <Draggable
        grid={[5, 5]}
        nodeRef={nameRef}
        position={properties.name.position}
        onStop={(event, data) => handleDragStop(data, "name")}
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
      >
        <div
          ref={summaryRef}
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
          id="workExperience"
          onDragStop={handleDragStop}
          position={properties.workExperience.position}
          dimensions={properties.workExperience.dimensions}
          imageProperties={{}}
          imageURL=""
          onResizeStop={handleResizeStop}
          key={index}
        >
          <Card
            sx={{
              position: "absolute",
              width: `${properties.workExperience.dimensions.width}px`,
              height: `${properties.workExperience.dimensions.height}px`,
            }}
          >
            <CardContent>
              <div>{exp.companyName}</div>
            </CardContent>
          </Card>
        </CustomDraggableResizable>
      ))}
    </Box>
  );
}
