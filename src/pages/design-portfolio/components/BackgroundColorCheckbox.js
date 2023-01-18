import { FormGroup } from "@mui/material";
import React from "react";
import CustomAccordion from "../../../components/CustomAccordion";
import CusotmCheckbox from "../../../components/design/CusotmCheckbox";
import CustomColorPicker from "../../../components/design/CustomColorPicker";

export default function BackgroundColorCheckbox(props) {
  return (
    <CustomAccordion
      id="bgCheckbox"
      title="Background Color"
      expanded={props.expanded}
      onChange={props.handleAccordionChange}
    >
      <FormGroup row>
        <CusotmCheckbox
          checked={props.properties.backgroundColorType === "static"}
          onChange={() => props.onChange("static", "backgroundColorType")}
          label="Static"
        />
        <CusotmCheckbox
          checked={props.properties.backgroundColorType === "linear-gradient"}
          onChange={() =>
            props.onChange("linear-gradient", "backgroundColorType")
          }
          label="Linear Gradient"
        />
        <CusotmCheckbox
          checked={props.properties.backgroundColorType === "radial-gradient"}
          onChange={() =>
            props.onChange("radial-gradient", "backgroundColorType")
          }
          label="Radial Gradient"
        />
        <CustomColorPicker
          properties={props.properties}
          onChange={props.onChange}
        />
      </FormGroup>
    </CustomAccordion>
  );
}
