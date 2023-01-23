import { Add, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Box, Button, IconButton, Slider } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import CustomDropdownList from "./CustomDropdownList";

export default function CustomTopMenu({
  zoomValue,
  handleZoom,
  resetDesign,
  saveDesign,
  onAddComponent,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const openDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleAddComponent = (type, value) => {
    // Create a new default properties object
    const newObject = {
      type: type,
      position: { x: 0, y: 0 },
      opacity: 100,
      zIndex: 10,
      value: value,
    };

    // Add properties based on type
    switch (type) {
      case "text":
        newObject.fontSize = 16;
        newObject.color = "white";
        newObject.dimensions = {
          width: value.length > 80 ? 700 : value.length * 10,
          height: value.length < 80 ? 30 : value.length / 2,
        };
        break;
      case "image":
        newObject.dimensions = { width: 200, height: 200 };
        newObject.borderRadius = 20;
        newObject.borderThickness = 5;
        newObject.borderType = "solid";
        newObject.borderColor = "white";
        break;
      case "shape":
        newObject.dimensions = { width: 200, height: 200 };
        newObject.color = "white";
        newObject.borderRadius = 0;
        newObject.borderThickness = 0;
        newObject.borderType = "solid";
        newObject.borderColor = "black";
        break;
      case "circle":
        break;
      case "line":
        break;
      default:
        break;
    }
    onAddComponent(newObject);
  };

  return (
    <Box>
      <Stack
        className="customizeCard"
        justifyContent="space-between"
        direction="row"
        spacing={2}
        position="relative"
      >
        <IconButton onClick={openDropdown}>
          <Add />
        </IconButton>
        <Box sx={{ width: "25%" }}>
          <Stack direction="row">
            <Stack spacing={2} direction="row" alignItems="center" width="100%">
              <ZoomOut />
              <Slider
                aria-label="Volume"
                max={300}
                min={0}
                step={10}
                value={zoomValue}
                onChange={handleZoom}
                valueLabelDisplay="auto"
              />
              <ZoomIn />
            </Stack>
            <Button variant="text" onClick={resetDesign}>
              Reset
            </Button>
            <Button variant="text" onClick={saveDesign}>
              Save
            </Button>
          </Stack>
        </Box>
      </Stack>
      {showDropdown && (
        <CustomDropdownList
          closeDropdown={closeDropdown}
          onAdd={handleAddComponent}
        />
      )}
    </Box>
  );
}
