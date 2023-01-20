import {
  Circle,
  HorizontalRule,
  Image,
  Rectangle,
  Title,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const menuList = [
  { icon: Title, label: "Add Text" },
  { icon: Image, label: "Add Image" },
  { icon: Rectangle, label: "Add Rectangle" },
  { icon: Circle, label: "Add Cirlce" },
  { icon: HorizontalRule, label: "Add Line" },
];

export default function CustomDropdownList() {
  return (
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
            <ListItemButton onClick={() => {}}>
              <ListItemIcon>
                <menu.icon />
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
