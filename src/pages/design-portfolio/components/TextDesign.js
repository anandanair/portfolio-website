import { Delete, FormatSize, Opacity } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomSlider from "../../../components/CustomSlider";

export default function TextDesign({
  properties,
  handleChildren,
  customizeObject,
  onDelete,
}) {
  return (
    <Box className="customizeForm">
      <Stack spacing={2} sx={{ m: 2 }}>
        <MuiColorInput
          label="Text Color"
          fullWidth
          value={properties[customizeObject.id].color}
          onChange={(color) =>
            handleChildren(color, customizeObject.id, "color")
          }
        />
        <CustomSlider
          icon={FormatSize}
          value={properties[customizeObject.id].fontSize}
          max={150}
          onChange={(event, newValue) =>
            handleChildren(newValue, customizeObject.id, "fontSize")
          }
        />
        <CustomSlider
          icon={Opacity}
          value={properties[customizeObject.id].opacity}
          max={100}
          onChange={(event, newValue) =>
            handleChildren(newValue, customizeObject.id, "opacity")
          }
        />
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </Stack>
    </Box>
  );
}
