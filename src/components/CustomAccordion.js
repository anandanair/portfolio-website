import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocalTheme } from "../contexts/ThemeContext";

export default function CustomAccordion(props) {
  const { localTheme } = useLocalTheme();
  return (
    <Accordion
      sx={{
        background:
          localTheme === "dark"
            ? "linear-gradient(280deg, var(--dark-primary-color), var(--dark-secondary-color) )"
            : "linear-gradient(280deg, var(--light-primary-color), var(--light-quaternary-color) 100% )",
      }}
      expanded={props.expanded === props.id}
      onChange={props.onChange(props.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${props.id}bh-content`}
        id={`${props.id}bh-header`}
      >
        <Typography sx={{ width: "100%", flexShrink: 0, textAlign: "left" }}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
