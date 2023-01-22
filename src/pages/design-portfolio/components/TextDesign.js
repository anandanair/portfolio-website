import { FormatSize, Opacity } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomSlider from "../../../components/CustomSlider";

export default function TextDesign({
  properties,
  handleChildren,
  customizeObject,
}) {
  return (
    <Stack spacing={2} style={{ marginRight: "16px", marginLeft: "16px" }}>
      <MuiColorInput
        label="Text Color"
        fullWidth
        value={properties[customizeObject.id].color}
        onChange={(color) => handleChildren(color, customizeObject.id, "color")}
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
    </Stack>
  );
}
