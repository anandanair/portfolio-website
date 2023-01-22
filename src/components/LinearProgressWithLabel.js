import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

export default function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
