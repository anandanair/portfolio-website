import { FormatSize, Opacity } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomAccordion from "../../../components/CustomAccordion";
import CustomSlider from "../../../components/CustomSlider";

export default function SummaryDesign(props) {
  return (
    <CustomAccordion
      id="summary"
      title="Text - Summary"
      expanded={props.expanded}
      onChange={props.handleAccordionChange}
    >
      <Stack spacing={2}>
        <MuiColorInput
          label="Text Color"
          fullWidth
          value={props.properties.summary.color}
          onChange={(color) => props.onChange(color, "summary", "color")}
        />
        <CustomSlider
          icon={FormatSize}
          value={props.properties.summary.fontSize}
          max={100}
          onChange={(event, newValue) =>
            props.onChange(newValue, "summary", "fontSize")
          }
        />
        <CustomSlider
          icon={Opacity}
          value={props.properties.summary.opacity}
          max={100}
          onChange={(event, newValue) =>
            props.onChange(newValue, "summary", "opacity")
          }
        />
      </Stack>
    </CustomAccordion>
  );
}
