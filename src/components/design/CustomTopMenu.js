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
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const openDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
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
      {showDropdown && <CustomDropdownList closeDropdown={closeDropdown} />}
    </Box>
  );
}
