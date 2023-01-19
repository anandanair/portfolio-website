import { Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useLocalTheme } from "../../contexts/ThemeContext";

export default function CustomDraggableResizable(props) {
  const properties = props.properties;
  const nodeRef = useRef(null);
  const firstRun = useRef(true);
  const [parentWidth, setParentWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
  const { getDynamicColor } = useLocalTheme();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
  });
  const [spacing, setSpacing] = useState({
    left: 0,
    right: 0,
    top: 0,
  });
  const [lefLineTop, setLeftLineTop] = useState(0);
  const [topLineLeft, setTopLineLeft] = useState(0);
  const [rightLineLeft, setRightLineLeft] = useState(0);
  const [editIconTop, setEditIconTop] = useState(properties.position.y);
  const [editIconLeft, setEditIconLeft] = useState(
    properties.position.x + properties.dimensions.width
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = (event) => {
    event.stopPropagation();
    setIsResizing(true);
  };

  const imageStyleProps = {
    backgroundImage: `url(${props.imageURL})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: !isResizing && `${properties.borderRadius}px`,
    opacity: properties.opacity / 100,
    border: `${properties.borderThickness}px ${properties.borderType} ${properties.borderColor}`,
  };

  const handleResizeStop = (e, direction, ref, d) => {
    setIsResizing(false);
    setChildWidth(childWidth + d.width);
    props.onResizeStop(d, `${props.id}`);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (event, data) => {
    setIsDragging(false);
    props.onDragStop(data, `${props.id}`);
  };

  const handleDrag = (event, data) => {
    const left = data.x;
    const right = parentWidth - (data.x + childWidth);
    const top = data.y;
    setLeftLineTop(top - 10 + properties.dimensions.height / 2);
    setTopLineLeft(left - 10 + properties.dimensions.width / 2);
    setRightLineLeft(left + properties.dimensions.width);
    setSpacing({
      left: left,
      right: right,
      top: top,
    });
  };

  //Call once on initialization
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      const componentWidth = nodeRef.current.offsetWidth;
      const boxWidth = props.boxRef.current.offsetWidth;
      setParentWidth(boxWidth);
      setChildWidth(componentWidth);
    }
  }, [props.boxRef]);

  //call whenever childWidth or parentWidth value changes
  useEffect(() => {
    if (childWidth !== 0) {
      setBounds((prevState) => {
        return {
          ...prevState,
          right: parentWidth - childWidth,
        };
      });
    }
  }, [childWidth, parentWidth]);

  //calls whenever position or width of element changes
  useEffect(() => {
    setEditIconTop(properties.position.y);
    setEditIconLeft(properties.position.x + properties.dimensions.width);
  }, [
    properties.position.y,
    properties.position.x,
    properties.dimensions.width,
  ]);

  return (
    <React.Fragment>
      {isDragging && (
        <React.Fragment>
          <div
            className="horizontal-dotted-line"
            style={{
              top: `${lefLineTop}px`,
              width: spacing.left,
              color: "white",
            }}
          >
            {spacing.left}px
          </div>
          <div
            className="vertical-dotted-line"
            style={{
              left: `${topLineLeft}px`,
              height: spacing.top,
              color: "white",
            }}
          >
            {spacing.top}px
          </div>
          <div
            className="horizontal-dotted-line"
            style={{
              top: `${lefLineTop}px`,
              left: `${rightLineLeft}px`,
              right: 0,
              width: spacing.right,
              color: "white",
            }}
          >
            {spacing.right}px
          </div>
        </React.Fragment>
      )}
      {!props.editable && !isDragging && !isResizing && (
        <IconButton
          onClick={() => props.onClick(props.id)}
          style={{
            position: "absolute",
            left: `${editIconLeft}px`,
            top: `${editIconTop}px`,
          }}
        >
          <Edit style={{ color: getDynamicColor(props.dynamicColor) }} />
        </IconButton>
      )}
      <Draggable
        nodeRef={nodeRef}
        bounds={bounds}
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
        position={properties.position}
        grid={[5, 5]}
        disabled={props.editable}
      >
        <Box
          className={
            props.component === "image" && !isResizing && "textContent"
          }
          ref={nodeRef}
          sx={{
            height: properties.dimensions.height + "px",
            width: properties.dimensions.width + "px",
            cursor: "pointer",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <Resizable
            className="textContent"
            size={properties.dimensions}
            style={props.component === "image" && imageStyleProps}
            onResizeStop={handleResizeStop}
            onResizeStart={handleResizeStart}
          >
            {props.children}
          </Resizable>
        </Box>
      </Draggable>
    </React.Fragment>
  );
}
