import { Box } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
    props.onResizeStop(d, `${props.id}`);
  };

  const handleResize = (e, direction, ref) => {
    setStateDimensions((prevState) => ({
      ...prevState,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    }));
  };

  const handleDragStop = (event, data) => {
    props.onDragStop(data, `${props.id}`);
  };

  const handleDrag = (event, data) => {
    const left = data.x;
    const right = parentWidth - (data.x + properties.dimensions.width);
    const top = data.y;
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

  function handleUndo() {
    props.onUndo();
    setContextMenu(initialContextMenu);
  }

  function handleRedo() {
    props.onRedo();
    setContextMenu(initialContextMenu);
  }

  const contextMenuClose = () => {
    setContextMenu(initialContextMenu);
  };

  // Call once on initialization
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      // const componentWidth = nodeRef.current.offsetWidth;
      const boxWidth = props.boxRef.current.offsetWidth;
      setParentWidth(boxWidth);
      // setChildWidth(componentWidth);
    }
  }, [props.boxRef]);

  //call whenever childWidth or parentWidth value changes
  useEffect(() => {
    if (properties.dimensions.width !== 0) {
      setBounds((prevState) => {
        return {
          ...prevState,
          right: parentWidth - properties.dimensions.width,
        };
      });
    }
  }, [properties.dimensions.width, parentWidth]);

  useEffect(() => {
    //SHow the spacing between elements
  }, [spacing]);

  useEffect(() => {
    setStateDimensions(properties.dimensions);
  }, [properties.dimensions]);

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

      case "shape":
        return (
          <div
            style={{
              backgroundColor: properties.color,
              width: stateDimensions.width,
              height: stateDimensions.height,
              borderRadius: properties.borderRadius,
              border: `${properties.borderThickness}px ${properties.borderType} ${properties.borderColor}`,
              opacity: properties.opacity / 100,
            }}
          ></div>
        );

      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <Draggable
        nodeRef={nodeRef}
        bounds={bounds}
        onStop={handleDragStop}
        onDrag={handleDrag}
        position={properties.position}
        grid={[25, 25]}
        disabled={contextMenu.show}
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
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
          )}
          <Resizable
            className="textContent"
            size={properties.dimensions}
            onResize={handleResize}
            onResizeStop={handleResizeStop}
            onResizeStart={handleResizeStart}
            grid={[25, 25]}
          >
            {renderSwitch(properties.type)}
          </Resizable>
        </Box>
      </Draggable>
    </React.Fragment>
  );
}
