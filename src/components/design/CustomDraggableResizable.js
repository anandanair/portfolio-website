import { Box } from "@mui/material";
import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export default function CustomDraggableResizable(props) {
  const nodeRef = useRef(null);
  const firstRun = useRef(true);
  const [parentWidth, setParentWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
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

  const [isDragging, setIsDragging] = useState(false);

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
    setLeftLineTop(top - 10 + props.dimensions.height / 2);
    setTopLineLeft(left - 10 + props.dimensions.width / 2);
    setRightLineLeft(left + props.dimensions.width);
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

  return (
    <div>
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
      <Draggable
        nodeRef={nodeRef}
        bounds={bounds}
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
        position={props.position}
        grid={[5, 5]}
      >
        <Box
          ref={nodeRef}
          onClick={props.onClick}
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
    </div>
  );
}
