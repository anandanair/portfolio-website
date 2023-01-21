import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Slider,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DrawerNavBar from "../components/DrawerNavBar";
import DesignedPage from "./layouts/DesignedPage";
import { useStorage } from "../contexts/StorageContext";
import { useFirestore } from "../contexts/FirestoreContext";
import Compressor from "compressorjs";
import { Add, ZoomIn, ZoomOut } from "@mui/icons-material";
import BackgroundColorCheckbox from "./design-portfolio/components/BackgroundColorCheckbox";
import NameDesign from "./design-portfolio/components/NameDesign";
import SummaryDesign from "./design-portfolio/components/SummaryDesign";
import PrimaryImageDesign from "./design-portfolio/components/PrimaryImageDesign";
import WorkExperienceDesign from "./design-portfolio/components/WorkExperienceDesign";
import CustomTopMenu from "../components/design/CustomTopMenu";
import EditPage from "./layouts/EditPage";

export default function DesignPortfolio() {
  const { uploadImageFile } = useStorage();
  const { firestoreUser, updateUser, createPortfolioDesign } = useFirestore();
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState(firestoreUser.design);
  const [expanded, setExpanded] = useState(false);
  const rafRef = useRef(null);
  const [zoomValue, setZoomValue] = useState(100);

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
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.5,
        success: async (result) => {
          await uploadImageFile(result, "primaryImage");
        },
      });
    }
  };

  const handleImageProperties = (value, name) => {
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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = (id) => {
    rafRef.current = requestAnimationFrame(() => {
      setExpanded(id);
    });
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
    setProperties(defaultDesign);
  }

  //On Mount and Unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
                {/* <Stack spacing={2}>
                  <BackgroundColorCheckbox
                    expanded={expanded}
                    handleAccordionChange={handleAccordionChange}
                    properties={properties}
                    onChange={handleChange}
                  />

                  <NameDesign
                    expanded={expanded}
                    handleAccordionChange={handleAccordionChange}
                    properties={properties}
                    onChange={handleNestedChange}
                  />
                  <SummaryDesign
                    expanded={expanded}
                    handleAccordionChange={handleAccordionChange}
                    properties={properties}
                    onChange={handleNestedChange}
                  />
                  <PrimaryImageDesign
                    expanded={expanded}
                    handleAccordionChange={handleAccordionChange}
                    properties={properties}
                    onChange={handleImageProperties}
                    onFileChange={handleFile}
                  />

                  {firestoreUser.portfolio.workExperience.map((exp, index) => (
                    <WorkExperienceDesign
                      key={index}
                      exp={exp}
                      index={index}
                      expanded={expanded}
                      handleAccordionChange={handleAccordionChange}
                      properties={properties[exp.id]}
                      onChange={handleNestedChange}
                      onFileChange={handleFile}
                    />
                  ))}
                </Stack> */}
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
            />

            <Card sx={{ width: 1, backgroundColor: "transparent" }}>
              <CardContent className="customizeCard" sx={{ height: "81vh" }}>
                <EditPage
                  properties={properties}
                  zoomValue={zoomValue}
                  handleZoom={setZoomValue}
                />
                {/* <DesignedPage
                  zoomValue={zoomValue}
                  properties={properties}
                  onResize={handleResize}
                  onDrag={handlePosition}
                  onClick={handleClick}
                  onUpdate={handleNestedChange}
                /> */}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar open={open} message="New design Saved!" />
    </DrawerNavBar>
  );
}
