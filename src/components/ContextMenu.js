import {
  ArrowDownward,
  ArrowUpward,
  ContentCopy,
  Delete,
  Edit,
  Redo,
  Undo,
  VerticalAlignBottom,
  VerticalAlignTop,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useRef } from "react";
import useOnClickOutside from "../utils/hooks/useOnClickOutside";

export default function ContextMenu({
  x,
  y,
  closeContextMenu,
  properties,
  onZIndexChange,
  onDelete,
  onCopy,
}) {
  const contextMenuRef = useRef(null);
  useOnClickOutside(contextMenuRef, closeContextMenu, false);

  const menuList = [
    { icon: ArrowUpward, label: "Send to Front", onClick: sendToFront },
    { icon: VerticalAlignTop, label: "Send to Top", onClick: sendToTop },
    { icon: ArrowDownward, label: "Send to Back", onClick: sendToBack },
    {
      icon: VerticalAlignBottom,
      label: "Send to Bottom",
      onClick: sendToBottom,
    },
  ];

  const topIconsList = [
    { icon: Undo, onClick: handleEditClick },
    { icon: Redo, onClick: handleEditClick },
    { icon: ContentCopy, onClick: onCopy },
    { icon: Edit, onClick: handleEditClick },
    { icon: Delete, onClick: onDelete },
  ];

  function handleEditClick() {}

  function sendToBack() {
    onZIndexChange(properties.zIndex - 1, "zIndex");
  }

  function sendToBottom() {
    onZIndexChange(0, "zIndex");
  }

  function sendToFront() {
    onZIndexChange(properties.zIndex + 1, "zIndex");
  }

  function sendToTop() {
    onZIndexChange(1000, "zIndex");
  }

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
      <Stack>
        <Stack
          direction="row"
          // spacing={1}
          justifyContent="space-between"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {topIconsList.map((icon, index) => (
            <IconButton key={index} onClick={icon.onClick}>
              <icon.icon fontSize="small" />
            </IconButton>
          ))}
        </Stack>
        <Divider />
        <List dense>
          {menuList.map((menu, index) => (
            <ListItem key={index} disableGutters>
              <ListItemButton onClick={menu.onClick}>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
}
