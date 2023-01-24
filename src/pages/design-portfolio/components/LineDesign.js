import { LineWeight, Rotate90DegreesCw } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomSlider from "../../../components/CustomSlider";

export default function LineDesign({ properties, onChange, customizeObject }) {
  return (
    <Box className="customizeForm">
      <Stack spacing={2} sx={{ m: 2 }}>
        <MuiColorInput
          label="Line Color"
          fullWidth
          value={properties[customizeObject.id].color}
          onChange={(color) => onChange(color, customizeObject.id, "color")}
        />
        <CustomSlider
          icon={Rotate90DegreesCw}
          value={properties[customizeObject.id].rotate}
          max={180}
          onChange={(event, newValue) =>
            onChange(newValue, customizeObject.id, "rotate")
          }
        />
        <CustomSlider
          icon={LineWeight}
          value={properties[customizeObject.id].thickness}
          max={20}
          onChange={(event, newValue) =>
            onChange(newValue, customizeObject.id, "thickness")
          }
        />
      </Stack>
    </Box>
  );
}
