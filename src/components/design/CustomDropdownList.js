import {
  Circle,
  HorizontalRule,
  Image,
  Rectangle,
  Title,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

export default function CustomDropdownList() {
  // State
  const [open, setOpen] = useState(false);

  //Functions
  const openTextDialog = () => {
    setOpen(true);
  };

  const closeTextDialog = () => {
    setOpen(false);
  };

  // List of Items in Menu
  const menuList = [
    { icon: Title, label: "Add Text", onclick: openTextDialog },
    { icon: Image, label: "Add Image", onclick: openTextDialog },
    { icon: Rectangle, label: "Add Rectangle", onclick: openTextDialog },
    { icon: Circle, label: "Add Cirlce", onclick: openTextDialog },
    { icon: HorizontalRule, label: "Add Line", onclick: openTextDialog },
  ];

  return (
    <React.Fragment>
      <Box
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
              <ListItemButton onClick={menu.onclick}>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog open={open} onClose={closeTextDialog}>
        <DialogTitle>Text</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a text from the details you added or enter a custom text to
            add.
          </DialogContentText>
          <Stack direction="row">
            
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
