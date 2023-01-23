import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import DrawerNavBar from "../components/DrawerNavBar";
import { useFirestore } from "../contexts/FirestoreContext";
import BackgroundColorCheckbox from "./design-portfolio/components/BackgroundColorCheckbox";
import TextDesign from "./design-portfolio/components/TextDesign";
import ImageDesign from "./design-portfolio/components/ImageDesign";
import CustomTopMenu from "../components/design/CustomTopMenu";
import EditPage from "./layouts/EditPage";
import { v4 as uuidv4 } from "uuid";

export default function DesignPortfolio() {
  const { firestoreUser, updateUser, createPortfolioDesign } = useFirestore();
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState(firestoreUser.design);
  const [expanded, setExpanded] = useState(false);
  const [zoomValue, setZoomValue] = useState(100);
  const [customizeObject, setCustomizeObject] = useState({});

  const handleChange = (value, name) => {
    setProperties({
      ...properties,
      [name]: value,
    });
  };

  const handleSlider = (event, newValue) => {
    setZoomValue(newValue);
  };

  const handlePosition = (x, y, name) => {
    setProperties({
      ...properties,
      children: {
        ...properties.children,
        [name]: {
          ...properties.children[name],
          position: {
            x: x,
            y: y,
          },
        },
      },
    });
  };

  const handleResize = (width, height, name) => {
    //  Set state
    setProperties({
      ...properties,
      children: {
        ...properties.children,
        [name]: {
          ...properties.children[name],
          // fontSize: newFontSize,
          dimensions: {
            width: width,
            height: height,
          },
        },
      },
    });
  };

  const handleOnClick = (object, key) => {
    const newObject = object;
    newObject.id = key;
    setCustomizeObject(newObject);
  };

  const addChildren = (value) => {
    setProperties({
      ...properties,
      children: {
        ...properties.children,
        [uuidv4()]: value,
      },
    });
  };

  const handleChildren = (value, name, nestedProp) => {
    setProperties({
      ...properties,
      children: {
        ...properties.children,
        [name]: {
          ...properties.children[name],
          [nestedProp]: value,
        },
      },
    });
  };

  const handleDelete = (id) => {
    setCustomizeObject({});
    const { [id]: removedChild, ...children } = properties.children;
    setProperties({
      ...properties,
      children,
    });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function saveDesign() {
    await updateUser("design", properties);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  async function resetDesign() {
    const defaultDesign = await createPortfolioDesign();
    setCustomizeObject({});
    setProperties(defaultDesign);
  }

  function renderSwitch(type) {
    switch (type) {
      case "text":
        return (
          <TextDesign
            properties={properties.children}
            handleChildren={handleChildren}
            customizeObject={customizeObject}
            // onDelete={handleDelete}
          />
        );
      case "image":
        return (
          <ImageDesign
            properties={properties.children}
            onChange={handleChildren}
            customizeObject={customizeObject}
            // onDelete={handleDelete}
          />
        );

      default:
        break;
    }
  }

  return (
    <DrawerNavBar>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Card className="customizeCard" sx={{ width: 1 }}>
            <CardHeader title="Customize" />
            <CardContent>
              <Box
                sx={{
                  height: "76vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Stack spacing={3}>
                  <BackgroundColorCheckbox
                    expanded={expanded}
                    handleAccordionChange={handleAccordionChange}
                    properties={properties}
                    onChange={handleChange}
                  />

                  {Object.keys(customizeObject).length > 0 && (
                    <Fade in={Object.keys(customizeObject).length > 0}>
                      <Box>{renderSwitch(customizeObject.type)}</Box>
                    </Fade>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Stack spacing={2} position="relative">
            <CustomTopMenu
              zoomValue={zoomValue}
              handleZoom={handleSlider}
              resetDesign={resetDesign}
              saveDesign={saveDesign}
              onAddComponent={addChildren}
            />

            <Card sx={{ width: 1, backgroundColor: "transparent" }}>
              <CardContent className="customizeCard" sx={{ height: "81vh" }}>
                <EditPage
                  properties={properties}
                  zoomValue={zoomValue}
                  handleZoom={setZoomValue}
                  onResize={handleResize}
                  onDrag={handlePosition}
                  onClick={handleOnClick}
                  onChange={handleChildren}
                  onDelete={handleDelete}
                  onCopy={addChildren}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar open={open} message="New design Saved!" />
    </DrawerNavBar>
  );
}
