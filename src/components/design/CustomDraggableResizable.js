import { Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocalTheme } from "../../contexts/ThemeContext";
import ContextMenu from "../ContextMenu";

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

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
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const [stateDimensions, setStateDimensions] = useState({
    width: properties.dimensions.width,
    height: properties.dimensions.height,
  });

  const handleResizeStart = (event) => {
    event.stopPropagation();
    setIsResizing(true);
  };

  const imageStyleProps = {
    objectFit: "cover",
    borderRadius: !isResizing && `${properties.borderRadius}px`,
    opacity: properties.opacity / 100,
    border: `${properties.borderThickness}px ${properties.borderType} ${properties.borderColor}`,
    pointerEvents: "none",
  };

  const handleResizeStop = (e, direction, ref, d) => {
    setIsResizing(false);
    setChildWidth(childWidth + d.width);
    props.onResizeStop(d, `${props.id}`);
  };

  const handleResize = (e, direction, ref) => {
    setStateDimensions((prevState) => ({
      ...prevState,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    }));
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

  const handleRightClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const childComponent = nodeRef.current;
    const { top, left } = childComponent.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    setContextMenu({ show: true, x, y });
  };

  const handleRightClickSelection = (value, name) => {
    props.onRightClick(value, props.id, name);
    setContextMenu(initialContextMenu);
  };

  function handleChildrenChange(value, name) {
    props.onChildrenChange(value, props.id, name);
    setContextMenu(initialContextMenu);
  }

  function handleDelete() {
    props.onDelete();
    setContextMenu(initialContextMenu);
  }

  function handleCopy() {
    props.onCopy();
    setContextMenu(initialContextMenu);
  }

  const contextMenuClose = () => {
    setContextMenu(initialContextMenu);
  };

  // Call once on initialization
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

  function renderSwitch(type) {
    switch (type) {
      case "text":
        return (
          <div
            style={{
              fontFamily: props.fontFamily,
              color: properties.color,
              fontSize: properties.fontSize,
              opacity: properties.opacity / 100,
              textAlign: "left",
            }}
          >
            {properties.value}
          </div>
        );
      case "image":
        return (
          <LazyLoadImage
            alt="image"
            effect="blur"
            height={stateDimensions.height}
            src={properties.value}
            width={stateDimensions.width}
            style={imageStyleProps}
          />
        );

      default:
        break;
    }
  }

  return (
    <React.Fragment>
      {/* {isDragging && (
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
      )} */}

      <Draggable
        nodeRef={nodeRef}
        bounds={bounds}
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
        position={properties.position}
        grid={[25, 25]}
        // disabled={props.editable}
      >
        <Box
          onContextMenu={handleRightClick}
          onClick={!contextMenu.show ? props.onClick : () => {}}
          className={
            properties.type === "image" && !isResizing && "textContent"
          }
          ref={nodeRef}
          sx={{
            height: properties.dimensions.height + "px",
            width: properties.dimensions.width + "px",
            cursor: "pointer",
            position: "absolute",
            zIndex: !contextMenu.show ? properties.zIndex : 9999,
          }}
        >
          {contextMenu.show && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              closeContextMenu={contextMenuClose}
              properties={properties}
              onZIndexChange={handleChildrenChange}
              onDelete={handleDelete}
              onCopy={handleCopy}
            />
          )}
          <Resizable
            className="textContent"
            size={properties.dimensions}
            onResize={handleResize}
            // style={properties.type === "image" && imageStyleProps}
            onResizeStop={handleResizeStop}
            onResizeStart={handleResizeStart}
          >
            {renderSwitch(properties.type)}
          </Resizable>
        </Box>
      </Draggable>
    </React.Fragment>
  );
}
