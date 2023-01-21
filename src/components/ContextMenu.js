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
  { icon: ArrowUpward, label: "Bring to Front", name: "zIndex" },
  { icon: ArrowDownward, label: "Send to Back", name: "zIndex" },
];

export default function ContextMenu({
  x,
  y,
  closeContextMenu,
  properties,
  onClick,
}) {
  const contextMenuRef = useRef(null);
  useOnClickOutside(contextMenuRef, closeContextMenu, false);

  const handleClick = (label, name) => {
    let newIndex = 1;
    if (label === "Bring to Front") {
      newIndex = properties.zIndex + 1;
    }
    onClick(newIndex, name);
  };

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
            <ListItemButton onClick={() => handleClick(menu.label, menu.name)}>
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
