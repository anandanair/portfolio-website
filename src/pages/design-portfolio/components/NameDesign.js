import { FormatSize, Opacity } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomAccordion from "../../../components/CustomAccordion";
import CustomSlider from "../../../components/CustomSlider";

export default function NameDesign(props) {
  return (
    <CustomAccordion
      id="nameDesign"
      title="Text - Name"
      expanded={props.expanded}
      onChange={props.handleAccordionChange}
    >
      <Stack spacing={2}>
        <MuiColorInput
          label="Text Color"
          fullWidth
          value={props.properties.name.color}
          onChange={(color) => props.onChange(color, "name", "color")}
        />
        <CustomSlider
          icon={FormatSize}
          value={props.properties.name.fontSize}
          max={100}
          onChange={(event, newValue) =>
            props.onChange(newValue, "name", "fontSize")
          }
        />
        <CustomSlider
          icon={Opacity}
          value={props.properties.name.opacity}
          max={100}
          onChange={(event, newValue) =>
            props.onChange(newValue, "name", "opacity")
          }
        />
      </Stack>
    </CustomAccordion>
  );
}
