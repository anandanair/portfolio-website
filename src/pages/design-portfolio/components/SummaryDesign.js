import { FormatSize, Opacity } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomForm from "../../../components/CustomForm";
import CustomSlider from "../../../components/CustomSlider";

export default function SummaryDesign(props) {
  return (
    <CustomForm label="Text - Summary">
      <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
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
        <MuiColorInput
          label="Text Color"
          fullWidth
          value={props.properties.name.color}
          onChange={(color) => props.onChange(color, "summary", "color")}
        />
      </Stack>
    </CustomForm>
  );
}
