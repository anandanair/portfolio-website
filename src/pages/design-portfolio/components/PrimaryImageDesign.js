import { Circle, LineWeight, Opacity } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomAccordion from "../../../components/CustomAccordion";
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

export default function PrimaryImageDesign(props) {
  return (
    <CustomAccordion
      id="primaryImage"
      title="Primary Image"
      expanded={props.expanded}
      onChange={props.handleAccordionChange}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="borderType">Border Type</InputLabel>
            <Select
              labelId="borderType"
              id="borderTypeSelect"
              value={props.properties.primaryImage.borderType}
              label="Border Type"
              onChange={(event) =>
                props.onChange(event.target.value, "borderType")
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
            value={props.properties.primaryImage.borderColor}
            onChange={(color) => props.onChange(color, "borderColor")}
          />
        </Stack>
        <CustomSlider
          icon={Opacity}
          value={props.properties.primaryImage.opacity}
          max={100}
          onChange={(event, newValue) => props.onChange(newValue, "opacity")}
        />
        <CustomSlider
          icon={Circle}
          max={
            Math.min(
              props.properties.primaryImage.dimensions.width,
              props.properties.primaryImage.dimensions.height
            ) / 2
          }
          value={props.properties.primaryImage.borderRadius}
          onChange={(event, newValue) =>
            props.onChange(newValue, "borderRadius")
          }
        />
        <CustomSlider
          icon={LineWeight}
          value={props.properties.primaryImage.borderThickness}
          max={30}
          onChange={(event, newValue) =>
            props.onChange(newValue, "borderThickness")
          }
        />
        <Button variant="outlined" component="label">
          Change Primary Image
          <input
            type="file"
            hidden
            accept=".jpg, .png, .jpeg"
            onChange={props.onFileChange}
          />
        </Button>
      </Stack>
    </CustomAccordion>
  );
}
