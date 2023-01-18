import { FormatSize, Opacity, Circle } from "@mui/icons-material";
import { Button, FormGroup, Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomAccordion from "../../../components/CustomAccordion";
import CustomForm from "../../../components/CustomForm";
import CustomSlider from "../../../components/CustomSlider";
import CusotmCheckbox from "../../../components/design/CusotmCheckbox";
import CustomColorPicker from "../../../components/design/CustomColorPicker";

export default function WorkExperienceDesign(props) {
  return (
    <CustomAccordion
      id={props.exp.id}
      title={props.exp.position}
      expanded={props.expanded}
      onChange={props.handleAccordionChange}
    >
      <Stack spacing={2}>
        <FormGroup row sx={{ mx: 1 }}>
          <CusotmCheckbox
            checked={props.properties.backgroundColorType === "static"}
            onChange={() =>
              props.onChange("static", props.exp.id, "backgroundColorType")
            }
            label="Static"
          />
          <CusotmCheckbox
            checked={props.properties.backgroundColorType === "linear-gradient"}
            onChange={() =>
              props.onChange(
                "linear-gradient",
                props.exp.id,
                "backgroundColorType"
              )
            }
            label="Linear Gradient"
          />
          <CusotmCheckbox
            checked={props.properties.backgroundColorType === "radial-gradient"}
            onChange={() =>
              props.onChange(
                "radial-gradient",
                props.exp.id,
                "backgroundColorType"
              )
            }
            label="Radial Gradient"
          />
        </FormGroup>
        <CustomColorPicker
          properties={props.properties}
          onChange={(value, name) => props.onChange(value, props.exp.id, name)}
        />
        <Button variant="outlined" component="label" fullWidth>
          Add Company Image
          <input
            type="file"
            hidden
            accept=".jpg, .png, .jpeg"
            onChange={props.onFileChange}
          />
        </Button>
        <CustomForm label="Card Opacity & Shape">
          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
            <CustomSlider
              icon={Opacity}
              value={props.properties.opacity}
              max={100}
              onChange={(event, newValue) =>
                props.onChange(newValue, props.exp.id, "opacity")
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
                props.onChange(newValue, props.exp.id, "borderRadius")
              }
            />
          </Stack>
        </CustomForm>
        <CustomForm label="Text - Position">
          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
            <CustomSlider
              icon={FormatSize}
              value={props.properties.roleFontSize}
              max={100}
              onChange={(event, newValue) =>
                props.onChange(newValue, props.exp.id, "roleFontSize")
              }
            />
            <MuiColorInput
              label="Text Color"
              fullWidth
              value={props.properties.roleTextColor}
              onChange={(color) =>
                props.onChange(color, props.exp.id, "roleTextColor")
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
                props.onChange(newValue, props.exp.id, "titleFontSize")
              }
            />
            <MuiColorInput
              label="Text Color"
              fullWidth
              value={props.properties.titleTextColor}
              onChange={(color) =>
                props.onChange(color, props.exp.id, "titleTextColor")
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
                props.onChange(newValue, props.exp.id, "descriptionFontSize")
              }
            />
            <MuiColorInput
              label="Text Color"
              fullWidth
              value={props.properties.descriptionTextColor}
              onChange={(color) =>
                props.onChange(color, props.exp.id, "descriptionTextColor")
              }
            />
          </Stack>
        </CustomForm>
      </Stack>
    </CustomAccordion>
  );
}
