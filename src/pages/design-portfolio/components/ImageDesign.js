import { Circle, LineWeight, Opacity } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomSlider from "../../../components/CustomSlider";

const borderTypes = [
  { value: "solid", label: "Solid" },
  { value: "dotted", label: "Dotted" },
  { value: "dashed", label: "Dashed" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
];

export default function ImageDesign({ properties, onChange, customizeObject }) {
  return (
    <Box className="customizeForm">
      <Stack spacing={2} sx={{ m: 2 }}>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="borderType">Border Type</InputLabel>
            <Select
              labelId="borderType"
              id="borderTypeSelect"
              value={properties[customizeObject.id].borderType}
              label="Border Type"
              onChange={(event) =>
                onChange(event.target.value, [customizeObject.id], "borderType")
              }
            >
              {borderTypes.map((type, index) => (
                <MenuItem key={index} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiColorInput
            label="Border Color"
            fullWidth
            value={properties[customizeObject.id].borderColor}
            onChange={(color) =>
              onChange(color, [customizeObject.id], "borderColor")
            }
          />
        </Stack>
        <CustomSlider
          icon={Opacity}
          value={properties[customizeObject.id].opacity}
          max={100}
          onChange={(event, newValue) =>
            onChange(newValue, [customizeObject.id], "opacity")
          }
        />
        <CustomSlider
          icon={Circle}
          max={
            Math.min(
              properties[customizeObject.id].dimensions.width,
              properties[customizeObject.id].dimensions.height
            ) / 2
          }
          value={properties[customizeObject.id].borderRadius}
          onChange={(event, newValue) =>
            onChange(newValue, [customizeObject.id], "borderRadius")
          }
        />
        <CustomSlider
          icon={LineWeight}
          value={properties[customizeObject.id].borderThickness}
          max={30}
          onChange={(event, newValue) =>
            onChange(newValue, [customizeObject.id], "borderThickness")
          }
        />
      </Stack>
    </Box>
  );
}
