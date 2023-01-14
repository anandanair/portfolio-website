import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Slider,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import CusotmCheckbox from "../components/design/CusotmCheckbox";
import CustomColorPicker from "../components/design/CustomColorPicker";
import DrawerNavBar from "../components/DrawerNavBar";
import { PropertiesModel } from "../models/PropertiesModel";
import DesignedPage from "./layouts/DesignedPage";
import { useStorage } from "../contexts/StorageContext";
import Compressor from "compressorjs";
import { Opacity } from "@mui/icons-material";

export default function DesignPortfolio() {
  const { uploadImageFile } = useStorage();
  const [loading, setLoading] = useState(false);
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
      { x: 10, y: 10 },
      {
        borderRadius: 0,
        opacity: 1,
        borderThickness: 5,
        borderType: "solid",
        borderColor: "#ddd",
      }
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

  const handleFile = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.5,
        success: async (result) => {
          await uploadImageFile(result, "primaryImage");
          setLoading(false);
        },
      });
    }
  };

  const handleImageProperties = (value, name) => {
    setProperties({
      ...properties,
      primaryImageProperties: {
        ...properties.primaryImageProperties,
        [name]: value,
      },
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
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 1 }}
                    alignItems="center"
                  >
                    <Opacity />
                    <Slider
                      value={properties.primaryImageProperties.opacity}
                      max={100}
                      min={0}
                      onChange={(event, newValue) =>
                        handleImageProperties(newValue, "opacity")
                      }
                    />
                  </Stack>

                  <Button variant="outlined" component="label">
                    Change Primary Image
                    <input
                      type="file"
                      hidden
                      accept=".jpg, .png, .jpeg"
                      onChange={handleFile}
                    />
                  </Button>
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
              {!loading ? (
                <DesignedPage
                  properties={properties}
                  onResize={handleResize}
                  onDrag={handlePosition}
                />
              ) : (
                <CircularProgress />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DrawerNavBar>
  );
}
