import { FormGroup } from "@mui/material";
import React from "react";
import CustomForm from "../../../components/CustomForm";
import CusotmCheckbox from "../../../components/design/CusotmCheckbox";

export default function BackgroundColorCheckbox(props) {
  return (
    <CustomForm label="Background Color">
      <FormGroup row sx={{ mx: 1 }}>
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
      </FormGroup>
    </CustomForm>
  );
}
