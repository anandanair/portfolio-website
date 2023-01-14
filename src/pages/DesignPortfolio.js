import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import CusotmCheckbox from "../components/design/CusotmCheckbox";
import CustomColorPicker from "../components/design/CustomColorPicker";
import DrawerNavBar from "../components/DrawerNavBar";
import { PropertiesModel } from "../models/PropertiesModel";
import DesignedPage from "./layouts/DesignedPage";

export default function DesignPortfolio() {
  const [properties, setProperties] = useState(
    new PropertiesModel(
      "static",
      "red",
      "blue",
      0,
      "circle at center",
      0,
      0,
      { width: 200, height: 200 },
      { x: 0, y: 0 }
    )
  );

  const handleChange = (value, name) => {
    setProperties({
      ...properties,
      [name]: value,
    });
  };

  const handleResize = (width, height, name) => {
    setProperties({
      ...properties,
      [name]: { width: width, height: height },
    });
  };

  const handlePosition = (x, y, name) => {
    setProperties({
      ...properties,
      [name]: { x: x, y: y },
    });
  };

  return (
    <DrawerNavBar>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card className="customizeCard" sx={{ width: 1 }}>
            <CardHeader title="Customize" />
            <CardContent>
              <Stack spacing={2}>
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
                <FormControl
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <FormLabel sx={{ textAlign: "left" }} component="legend">
                    Portfolio Image
                  </FormLabel>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card
            // className="customizeCard"
            sx={{ width: 1, backgroundColor: "white" }}
          >
            <CardContent>
              <DesignedPage
                properties={properties}
                onResize={handleResize}
                onDrag={handlePosition}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DrawerNavBar>
  );
}
