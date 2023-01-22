import {
  Circle,
  HorizontalRule,
  Image,
  Rectangle,
  Title,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useLocalTheme } from "../../contexts/ThemeContext";
import formatCamelCase from "../../utils/formatCamelCase";
import Compressor from "compressorjs";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import { useStorage } from "../../contexts/StorageContext";
import { v4 as uuidv4 } from "uuid";
import LinearProgressWithLabel from "../LinearProgressWithLabel";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

const lightTheme = createTheme({
  palette: { mode: "light" },
});

export default function CustomDropdownList({ closeDropdown, onAdd }) {
  // State
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [nestedObjects, setNestedObjects] = useState([]);
  const [currentDialog, setCurrentDialog] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Refs
  const menuRef = useRef(null);

  // Contexts
  const { firestoreUser } = useFirestore();
  const { localTheme } = useLocalTheme();
  const { uploadImageFile } = useStorage();

  //Functions
  const openTextDialog = (type) => {
    setCurrentDialog(type);
    setOpen(true);
  };

  const closeTextDialog = () => {
    setOpen(false);
  };

  useOnClickOutside(menuRef, closeDropdown, open);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChip = (key) => {
    const object = firestoreUser.portfolio[key];
    setNestedObjects([]);
    // If value is a string
    if (!Array.isArray(object)) {
      setValue(object);
      return;
    }
    // If the value is an Array
    setNestedObjects(object);
  };

  const handleNestedChip = (string) => {
    setValue(string);
  };

  const handleTextAdd = () => {
    closeTextDialog();
    closeDropdown();
    onAdd("text", value);
  };

  const handleImageAdd = (event) => {
    const file = event.target.files[0];
    let imageURL = "";
    if (file) {
      setImageUploading(true);
      new Compressor(file, {
        quality: 0.5,
        success: async (result) => {
          // imageURL = await uploadImageFile(result, uuidv4());
          imageURL = await uploadImageFile(result, uuidv4(), (progress) => {
            setProgress(progress);
          });
          setImageUploading(false);
          closeTextDialog();
          closeDropdown();
          onAdd("image", imageURL);
        },
      });
    }
  };

  // List of Items in Menu
  const menuList = [
    { icon: Title, label: "Add Text", onclick: openTextDialog, type: "Text" },
    { icon: Image, label: "Add Image", onclick: openTextDialog, type: "Image" },
    {
      icon: Rectangle,
      label: "Add Rectangle",
      onclick: openTextDialog,
      type: "text",
    },
    {
      icon: Circle,
      label: "Add Cirlce",
      onclick: openTextDialog,
      type: "text",
    },
    {
      icon: HorizontalRule,
      label: "Add Line",
      onclick: openTextDialog,
      type: "text",
    },
  ];

  return (
    <Box>
      <Box
        ref={menuRef}
        className="rightClickMenu"
        style={{
          position: "absolute",
          top: 40,
          left: 10,
          zIndex: 1000,
          width: "200px",
        }}
      >
        <List dense>
          {menuList.map((menu, index) => (
            <ListItem key={index} disableGutters>
              <ListItemButton onClick={() => menu.onclick(menu.type)}>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <ThemeProvider theme={localTheme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Dialog open={open} onClose={closeTextDialog}>
          <DialogTitle>{currentDialog}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {currentDialog === "Text"
                ? "Select a text from the details you added or enter a custom text to add."
                : "Upload an image from your device."}
            </DialogContentText>
            {currentDialog === "Text" ? (
              <React.Fragment>
                <Grid
                  sx={{ my: 2 }}
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  {Object.keys(firestoreUser.portfolio)
                    .filter(
                      (key) => key !== "primaryPhotoURL" && key !== "createdAt"
                    )
                    .map((key, index) => (
                      <Grid key={index} item>
                        <Chip
                          label={formatCamelCase(key)}
                          onClick={() => handleChip(key)}
                        />
                      </Grid>
                    ))}
                </Grid>

                {nestedObjects.map((object, index) => (
                  <Box key={index}>
                    <Divider />
                    <Grid
                      sx={{ my: 2 }}
                      container
                      spacing={1}
                      direction="row"
                      // justifyContent="space-around"
                      alignItems="center"
                    >
                      {Object.keys(object)
                        .filter(
                          (key) =>
                            key !== "startDate" &&
                            key !== "endDate" &&
                            key !== "id" &&
                            key !== "issueDate" &&
                            key !== "credentialURL"
                        )
                        .map((key, index) => (
                          <Grid key={index} item>
                            <Chip
                              label={
                                object[key].length < 80
                                  ? object[key]
                                  : "Description"
                              }
                              onClick={() => handleNestedChip(object[key])}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                ))}

                <TextField
                  autoFocus
                  margin="dense"
                  id="addText"
                  label="Text to Add"
                  multiline={value.length > 50}
                  value={value}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {imageUploading && <LinearProgressWithLabel value={progress} />}
                <Button
                  disabled={imageUploading}
                  fullWidth
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept=".jpg, .png, .jpeg"
                    onChange={handleImageAdd}
                  />
                </Button>
              </React.Fragment>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeTextDialog}>Cancel</Button>
            {currentDialog === "Text" && (
              <Button onClick={handleTextAdd}>Add</Button>
            )}
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Box>
  );
}
