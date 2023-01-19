import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useRef } from "react";
import useOnClickOutside from "../utils/hooks/useOnClickOutside";

const menuList = [
  { icon: ArrowUpward, label: "Bring to Front" },
  { icon: ArrowDownward, label: "Send to Back" },
];

export default function ContextMenu({ x, y, closeContextMenu }) {
  const contextMenuRef = useRef(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);
  return (
    <Box
      className="rightClickMenu"
      ref={contextMenuRef}
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        zIndex: 1000,
        width: "200px",
      }}
    >
      <List dense>
        {menuList.map((menu, index) => (
          <ListItem key={index} disableGutters>
            <ListItemButton>
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
