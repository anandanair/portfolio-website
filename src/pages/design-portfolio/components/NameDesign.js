import { FormatSize, Opacity } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomForm from "../../../components/CustomForm";
import CustomSlider from "../../../components/CustomSlider";

export default function NameDesign(props) {
  return (
    <CustomForm label="Text - Name">
      <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
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
        <MuiColorInput
          label="Text Color"
          fullWidth
          value={props.properties.name.color}
          onChange={(color) => props.onChange(color, "name", "color")}
        />
      </Stack>
    </CustomForm>
  );
}
