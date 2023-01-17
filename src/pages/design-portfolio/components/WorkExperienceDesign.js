import { FormatSize, Opacity, Circle } from "@mui/icons-material";
import { Button, FormGroup, Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomForm from "../../../components/CustomForm";
import CustomSlider from "../../../components/CustomSlider";
import CusotmCheckbox from "../../../components/design/CusotmCheckbox";
import CustomColorPicker from "../../../components/design/CustomColorPicker";

export default function WorkExperienceDesign(props) {
  return (
    <CustomForm key={props.index} label={`Work Exp Card - ${props.index + 1}`}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <CustomForm label="Background Color">
          <FormGroup row sx={{ mx: 1 }}>
            <CusotmCheckbox
              checked={props.properties.backgroundColorType === "static"}
              onChange={() =>
                props.onChange("static", props.id, "backgroundColorType")
              }
              label="Static"
            />
            <CusotmCheckbox
              checked={
                props.properties.backgroundColorType === "linear-gradient"
              }
              onChange={() =>
                props.onChange(
                  "linear-gradient",
                  props.id,
                  "backgroundColorType"
                )
              }
              label="Linear Gradient"
            />
            <CusotmCheckbox
              checked={
                props.properties.backgroundColorType === "radial-gradient"
              }
              onChange={() =>
                props.onChange(
                  "radial-gradient",
                  props.id,
                  "backgroundColorType"
                )
              }
              label="Radial Gradient"
            />
          </FormGroup>
        </CustomForm>
        <CustomColorPicker
          properties={props.properties}
          onChange={(value, name) => props.onChange(value, props.id, name)}
        />
        <CustomForm label="Text - Position">
          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
            <CustomSlider
              icon={FormatSize}
              value={props.properties.roleFontSize}
              max={100}
              onChange={(event, newValue) =>
                props.onChange(newValue, props.id, "roleFontSize")
              }
            />
            <MuiColorInput
              label="Text Color"
              fullWidth
              value={props.properties.roleTextColor}
              onChange={(color) =>
                props.onChange(color, props.id, "roleTextColor")
              }
            />
          </Stack>
        </CustomForm>
        <CustomForm label="Text - Company Name">
          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
            <CustomSlider
              icon={FormatSize}
              value={props.properties.titleFontSize}
              max={100}
              onChange={(event, newValue) =>
                props.onChange(newValue, props.id, "titleFontSize")
              }
            />
            <MuiColorInput
              label="Text Color"
              fullWidth
              value={props.properties.titleTextColor}
              onChange={(color) =>
                props.onChange(color, props.id, "titleTextColor")
              }
            />
          </Stack>
        </CustomForm>
        <CustomForm label="Text - Description">
          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
            <CustomSlider
              icon={FormatSize}
              value={props.properties.descriptionFontSize}
              max={100}
              onChange={(event, newValue) =>
                props.onChange(newValue, props.id, "descriptionFontSize")
              }
            />
            <MuiColorInput
              label="Text Color"
              fullWidth
              value={props.properties.descriptionTextColor}
              onChange={(color) =>
                props.onChange(color, props.id, "descriptionTextColor")
              }
            />
          </Stack>
        </CustomForm>
        <CustomForm label="Card Opacity & Shape">
          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
            <CustomSlider
              icon={Opacity}
              value={props.properties.opacity}
              max={100}
              onChange={(event, newValue) =>
                props.onChange(newValue, props.id, "opacity")
              }
            />
            <CustomSlider
              icon={Circle}
              value={props.properties.borderRadius}
              max={
                Math.min(
                  props.properties.dimensions.width,
                  props.properties.dimensions.height
                ) / 2
              }
              onChange={(event, newValue) =>
                props.onChange(newValue, props.id, "borderRadius")
              }
            />
            <Button variant="outlined" component="label">
              Add Company Image
              <input
                type="file"
                hidden
                accept=".jpg, .png, .jpeg"
                onChange={props.onFileChange}
              />
            </Button>
          </Stack>
        </CustomForm>
      </Stack>
    </CustomForm>
  );
}
