import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import CusotmCheckbox from "../components/design/CusotmCheckbox";
import CustomColorPicker from "../components/design/CustomColorPicker";
import DrawerNavBar from "../components/DrawerNavBar";
import DesignedPage from "./layouts/DesignedPage";
import { useStorage } from "../contexts/StorageContext";
import { useFirestore } from "../contexts/FirestoreContext";
import Compressor from "compressorjs";
import {
  Add,
  Circle,
  FormatSize,
  LineWeight,
  Opacity,
} from "@mui/icons-material";
import { MuiColorInput } from "mui-color-input";
import CustomFrom from "../components/CustomForm";
import CustomSlider from "../components/CustomSlider";

const borderTypes = [
  { value: "solid", label: "Solid" },
  { value: "dotted", label: "Dotted" },
  { value: "dashed", label: "Dashed" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
];

export default function DesignPortfolio() {
  const { uploadImageFile } = useStorage();
  const [loading, setLoading] = useState(false);
  const { firestoreUser } = useFirestore();
  const [properties, setProperties] = useState(firestoreUser.design);

  const handleChange = (value, name) => {
    setProperties({
      ...properties,
      [name]: value,
    });
  };

  const handlePosition = (x, y, name) => {
    setProperties({
      ...properties,
      [name]: {
        ...properties[name],
        position: {
          x: x,
          y: y,
        },
      },
    });
  };

  const handleResize = (width, height, name) => {
    setProperties({
      ...properties,
      [name]: {
        ...properties[name],
        dimensions: {
          width: width,
          height: height,
        },
      },
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
    console.log(value);

    setProperties({
      ...properties,
      primaryImage: {
        ...properties.primaryImage,
        [name]: value,
      },
    });
  };

  const handleNestedChange = (value, name, nestedProp) => {
    setProperties({
      ...properties,
      [name]: {
        ...properties[name],
        [nestedProp]: value,
      },
    });
  };

  return (
    <DrawerNavBar>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Card className="customizeCard" sx={{ width: 1 }}>
            <CardHeader title="Customize" />
            <CardContent>
              <Box
                sx={{ height: "76vh", overflowY: "auto", overflowX: "hidden" }}
              >
                <Stack spacing={2}>
                  <CustomFrom label="Background Color">
                    <FormGroup row sx={{ mx: 1 }}>
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
                  </CustomFrom>
                  <CustomColorPicker
                    properties={properties}
                    onChange={handleChange}
                  />
                  <CustomFrom label="Text - Name">
                    <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                      <CustomSlider
                        icon={FormatSize}
                        value={properties.name.fontSize}
                        max={100}
                        onChange={(event, newValue) =>
                          handleNestedChange(newValue, "name", "fontSize")
                        }
                      />
                      <CustomSlider
                        icon={Opacity}
                        value={properties.name.opacity}
                        max={100}
                        onChange={(event, newValue) =>
                          handleNestedChange(newValue, "name", "opacity")
                        }
                      />
                      <MuiColorInput
                        label="Text Color"
                        fullWidth
                        value={properties.name.color}
                        onChange={(color) =>
                          handleNestedChange(color, "name", "color")
                        }
                      />
                    </Stack>
                  </CustomFrom>
                  <CustomFrom label="Text - Summary">
                    <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                      <CustomSlider
                        icon={FormatSize}
                        value={properties.summary.fontSize}
                        max={100}
                        onChange={(event, newValue) =>
                          handleNestedChange(newValue, "summary", "fontSize")
                        }
                      />
                      <CustomSlider
                        icon={Opacity}
                        value={properties.summary.opacity}
                        max={100}
                        onChange={(event, newValue) =>
                          handleNestedChange(newValue, "summary", "opacity")
                        }
                      />
                      <MuiColorInput
                        label="Text Color"
                        fullWidth
                        value={properties.name.color}
                        onChange={(color) =>
                          handleNestedChange(color, "summary", "color")
                        }
                      />
                    </Stack>
                  </CustomFrom>
                  <CustomFrom label="Portfolio Image">
                    <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                      <CustomSlider
                        icon={Opacity}
                        value={properties.primaryImage.opacity}
                        max={100}
                        onChange={(event, newValue) =>
                          handleImageProperties(newValue, "opacity")
                        }
                      />
                      <CustomSlider
                        icon={Circle}
                        max={
                          Math.min(
                            properties.primaryImage.dimensions.width,
                            properties.primaryImage.dimensions.height
                          ) / 2
                        }
                        value={properties.primaryImage.borderRadius}
                        onChange={(event, newValue) =>
                          handleImageProperties(newValue, "borderRadius")
                        }
                      />
                      <CustomSlider
                        icon={LineWeight}
                        value={properties.primaryImage.borderThickness}
                        max={30}
                        onChange={(event, newValue) =>
                          handleImageProperties(newValue, "borderThickness")
                        }
                      />
                      <Stack direction="row" spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="borderType">Border Type</InputLabel>
                          <Select
                            labelId="borderType"
                            id="borderTypeSelect"
                            value={properties.primaryImage.borderType}
                            label="Border Type"
                            onChange={(event) =>
                              handleImageProperties(
                                event.target.value,
                                "borderType"
                              )
                            }
                          >
                            {borderTypes.map((type, index) => (
                              <MenuItem key={index} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <MuiColorInput
                          label="Border Color"
                          fullWidth
                          value={properties.primaryImage.borderColor}
                          onChange={(color) =>
                            handleImageProperties(color, "borderColor")
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
                    </Stack>
                  </CustomFrom>
                  {firestoreUser.portfolio.workExperience.map((exp, index) => (
                    <CustomFrom
                      key={index}
                      label={`Work Exp Card - ${index + 1}`}
                    >
                      <Stack spacing={2} sx={{ mt: 2 }}>
                        <CustomFrom label="Background Color">
                          <FormGroup row sx={{ mx: 1 }}>
                            <CusotmCheckbox
                              checked={
                                properties[exp.id].backgroundColorType ===
                                "static"
                              }
                              onChange={() =>
                                handleNestedChange(
                                  "static",
                                  exp.id,
                                  "backgroundColorType"
                                )
                              }
                              label="Static"
                            />
                            <CusotmCheckbox
                              checked={
                                properties[exp.id].backgroundColorType ===
                                "linear-gradient"
                              }
                              onChange={() =>
                                handleNestedChange(
                                  "linear-gradient",
                                  exp.id,
                                  "backgroundColorType"
                                )
                              }
                              label="Linear Gradient"
                            />
                            <CusotmCheckbox
                              checked={
                                properties[exp.id].backgroundColorType ===
                                "radial-gradient"
                              }
                              onChange={() =>
                                handleNestedChange(
                                  "radial-gradient",
                                  exp.id,
                                  "backgroundColorType"
                                )
                              }
                              label="Radial Gradient"
                            />
                          </FormGroup>
                        </CustomFrom>
                        <CustomColorPicker
                          properties={properties[exp.id]}
                          onChange={(value, name) =>
                            handleNestedChange(value, exp.id, name)
                          }
                        />
                        <CustomFrom label="Text - Position">
                          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center"
                            >
                              <FormatSize />
                              <Slider
                                value={properties[exp.id].roleFontSize}
                                max={100}
                                min={0}
                                onChange={(event, newValue) =>
                                  handleNestedChange(
                                    newValue,
                                    exp.id,
                                    "roleFontSize"
                                  )
                                }
                              />
                            </Stack>
                            <MuiColorInput
                              label="Text Color"
                              fullWidth
                              value={properties[exp.id].roleTextColor}
                              onChange={(color) =>
                                handleNestedChange(
                                  color,
                                  exp.id,
                                  "roleTextColor"
                                )
                              }
                            />
                          </Stack>
                        </CustomFrom>
                        <CustomFrom label="Text - Company Name">
                          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center"
                            >
                              <FormatSize />
                              <Slider
                                value={properties[exp.id].titleFontSize}
                                max={100}
                                min={0}
                                onChange={(event, newValue) =>
                                  handleNestedChange(
                                    newValue,
                                    exp.id,
                                    "titleFontSize"
                                  )
                                }
                              />
                            </Stack>
                            <MuiColorInput
                              label="Text Color"
                              fullWidth
                              value={properties[exp.id].titleTextColor}
                              onChange={(color) =>
                                handleNestedChange(
                                  color,
                                  exp.id,
                                  "titleTextColor"
                                )
                              }
                            />
                          </Stack>
                        </CustomFrom>
                        <CustomFrom label="Text - Description">
                          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center"
                            >
                              <FormatSize />
                              <Slider
                                value={properties[exp.id].descriptionFontSize}
                                max={100}
                                min={0}
                                onChange={(event, newValue) =>
                                  handleNestedChange(
                                    newValue,
                                    exp.id,
                                    "descriptionFontSize"
                                  )
                                }
                              />
                            </Stack>
                            <MuiColorInput
                              label="Text Color"
                              fullWidth
                              value={properties[exp.id].descriptionTextColor}
                              onChange={(color) =>
                                handleNestedChange(
                                  color,
                                  exp.id,
                                  "descriptionTextColor"
                                )
                              }
                            />
                          </Stack>
                        </CustomFrom>
                        <CustomFrom label="Card Opacity & Shape">
                          <Stack sx={{ mt: 2, mx: 1 }} spacing={2}>
                            <CustomSlider
                              icon={Opacity}
                              value={properties[exp.id].opacity}
                              max={100}
                              onChange={(event, newValue) =>
                                handleNestedChange(newValue, exp.id, "opacity")
                              }
                            />
                            <CustomSlider
                              icon={Circle}
                              value={properties[exp.id].borderRadius}
                              max={
                                Math.min(
                                  properties[exp.id].dimensions.width,
                                  properties[exp.id].dimensions.height
                                ) / 2
                              }
                              onChange={(event, newValue) =>
                                handleNestedChange(
                                  newValue,
                                  exp.id,
                                  "borderRadius"
                                )
                              }
                            />
                            <Button variant="outlined" component="label">
                              Add Company Image
                              <input
                                type="file"
                                hidden
                                accept=".jpg, .png, .jpeg"
                                onChange={handleFile}
                              />
                            </Button>
                          </Stack>
                        </CustomFrom>
                      </Stack>
                    </CustomFrom>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Stack spacing={2}>
            <Stack className="customizeCard" direction="row" spacing={2}>
              <IconButton>
                <Add />
              </IconButton>
            </Stack>

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
          </Stack>
        </Grid>
      </Grid>
    </DrawerNavBar>
  );
}
