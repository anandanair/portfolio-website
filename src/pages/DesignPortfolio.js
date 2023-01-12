import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import CusotmCheckbox from "../components/design/CusotmCheckbox";
import CustomColorPicker from "../components/design/CustomColorPicker";
import DrawerNavBar from "../components/DrawerNavBar";
import { PropertiesModel } from "../models/PropertiesModel";
import DesigndPage from "./layouts/DesigndPage";

export default function DesignPortfolio() {
  const [properties, setProperties] = useState(
    new PropertiesModel("static", "red", "blue", 0, "circle at center", 0, 0)
  );

  const handleChange = (value, name) => {
    setProperties({
      ...properties,
      [name]: value,
    });
  };

  return (
    <DrawerNavBar>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card className="customizeCard" sx={{ width: 1 }}>
            <CardHeader title="Customize" />
            <CardContent>
              <FormControl
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <FormLabel sx={{ textAlign: "left" }} component="legend">
                  Background Color
                </FormLabel>
                <FormGroup row>
                  <CusotmCheckbox
                    checked={properties.backgroundColorType === "static"}
                    onChange={() =>
                      handleChange("static", "backgroundColorType")
                    }
                    label="Static"
                  />
                  <CusotmCheckbox
                    checked={
                      properties.backgroundColorType === "linear-gradient"
                    }
                    onChange={() =>
                      handleChange("linear-gradient", "backgroundColorType")
                    }
                    label="Linear Gradient"
                  />
                  <CusotmCheckbox
                    checked={
                      properties.backgroundColorType === "radial-gradient"
                    }
                    onChange={() =>
                      handleChange("radial-gradient", "backgroundColorType")
                    }
                    label="Radial Gradient"
                  />
                </FormGroup>
              </FormControl>
              <CustomColorPicker
                properties={properties}
                onChange={handleChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card
            // className="customizeCard"
            sx={{ width: 1, backgroundColor: "white" }}
          >
            <CardContent>
              <DesigndPage properties={properties} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DrawerNavBar>
  );
}
