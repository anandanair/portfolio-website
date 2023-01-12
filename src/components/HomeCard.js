import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function HomeCard(props) {
  return (
    <Card
      className={`designCard ${props.className}`}
      sx={{ maxWidth: "50vw", display: "flex", minHeight: "40vh" }}
      onClick={props.onClick}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        }}
      >
        <Typography sx={{ width: props.width }} variant="h2">
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
