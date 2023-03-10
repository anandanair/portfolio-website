import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  Link,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
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
import ShapeDesign from "./design-portfolio/components/ShapeDesign";
import LineDesign from "./design-portfolio/components/LineDesign";
import { useLocalTheme } from "../contexts/ThemeContext";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

const lightTheme = createTheme({
  palette: { mode: "light" },
});

export default function DesignPortfolio() {
  // Contexts
  const {
    firestoreUser,
    updateUser,
    createPortfolioDesign,
    createHandle,
    updatePublish,
  } = useFirestore();
  const { localTheme } = useLocalTheme();

  // State
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState(firestoreUser.design);
  const [expanded, setExpanded] = useState(false);
  const [zoomValue, setZoomValue] = useState(100);
  const [customizeObject, setCustomizeObject] = useState({});
  const [history, setHistory] = useState([properties.children]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [handleTextError, setHandleTextError] = useState("");
  const [loading, setLoading] = useState(false);
  const [handleResponse, setHandleResponse] = useState({
    error: true,
    message: "",
  });

  // Functions
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
    let update = {
      ...properties.children,
      [name]: { ...properties.children[name], position: { x: x, y: y } },
    };
    setProperties({
      ...properties,
      children: update,
    });
    addHistory(update);
  };

  // Add's the previous state to history array
  function addHistory(update) {
    setHistory((prevHistory) => {
      if (prevHistory.length === 20) {
        setCurrentIndex(19);
        prevHistory.shift();
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      return [...prevHistory.slice(0, currentIndex + 1), update];
    });
  }

  // When user click undo button
  function handleUndo() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProperties({
        ...properties,
        children: history[currentIndex - 1],
      });
    }
  }

  // When user click redo button
  function handleRedo() {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProperties({
        ...properties,
        children: history[currentIndex + 1],
      });
    }
  }

  const handleResize = (width, height, name) => {
    let update = {
      ...properties.children,
      [name]: {
        ...properties.children[name],
        dimensions: { width: width, height: height },
      },
    };
    setProperties({
      ...properties,
      children: update,
    });
    addHistory(update);
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

  function handleText(event) {
    const input = event.target.value;
    const pattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    setHandle(event.target.value);

    if (pattern.test(input)) {
      setHandleTextError("");
      return;
    }
    setHandleTextError(
      "Invalid input. The handle must start with a letter and can only contain letters, numbers, dashes, and underscores."
    );
  }

  async function publishDesign() {
    if (handleTextError === "") {
      if (handle.length > 2) {
        //Publish
        setLoading(true);
        const response = await createHandle(handle, properties);
        setHandleResponse(response);
        setLoading(false);
        return;
      }
      setHandleTextError("The handle must have minimum 3 characters");
    }
  }

  async function updatePublishDesign() {
    setLoading(true);
    const response = await updatePublish(properties);
    setHandleResponse(response);
    setLoading(false);
  }

  async function resetDesign() {
    const defaultDesign = await createPortfolioDesign();
    setCustomizeObject({});
    setProperties(defaultDesign);
  }

  function openPublishDialog() {
    setDialogOpen(true);
  }

  function closePublishDialog() {
    setHandle("");
    setHandleTextError("");
    setHandleResponse({
      error: true,
      message: "",
    });
    setDialogOpen(false);
  }

  function renderSwitch(type) {
    switch (type) {
      case "text":
        return (
          <TextDesign
            properties={properties.children}
            handleChildren={handleChildren}
            customizeObject={customizeObject}
          />
        );
      case "image":
        return (
          <ImageDesign
            properties={properties.children}
            onChange={handleChildren}
            customizeObject={customizeObject}
          />
        );
      case "shape":
        return (
          <ShapeDesign
            properties={properties.children}
            onChange={handleChildren}
            customizeObject={customizeObject}
          />
        );

      case "line":
        return (
          <LineDesign
            properties={properties.children}
            onChange={handleChildren}
            customizeObject={customizeObject}
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
              openPublishDialog={openPublishDialog}
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
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  onParentDimensions={handleChange}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar open={open} message="New design Saved!" />
      <ThemeProvider theme={localTheme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Dialog open={dialogOpen} onClose={closePublishDialog}>
          <DialogTitle>Publish</DialogTitle>
          <DialogContent>
            {firestoreUser.handle ? (
              <React.Fragment>
                <Alert severity="info" sx={{ mb: 2 }}>
                  You have already created your handle!. Check your page at{" "}
                  <Link
                    target="_blank"
                    href={`/handles/${firestoreUser.handle}`}
                    underline="hover"
                  >
                    {firestoreUser.handle}
                  </Link>
                </Alert>
                <DialogContentText>
                  You can publish your latest changes here!.
                </DialogContentText>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <DialogContentText>
                  Your Portfolio Website will be available publically after you
                  publish!. You won't be able to change your handle once you
                  have published.
                </DialogContentText>
                {handleResponse.error && (
                  <TextField
                    error={handleTextError !== ""}
                    required
                    fullWidth
                    label="Handle"
                    value={handle}
                    onChange={handleText}
                    sx={{ mt: 2 }}
                    helperText={handleTextError}
                  />
                )}
              </React.Fragment>
            )}
            {handleResponse.message !== "" && (
              <Alert
                severity={handleResponse.error ? "error" : "success"}
                sx={{ mt: 2 }}
              >
                {handleResponse.message}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closePublishDialog}>Cancel</Button>
            <Button
              disabled={loading}
              onClick={
                firestoreUser.handle ? updatePublishDesign : publishDesign
              }
            >
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </DrawerNavBar>
  );
}
