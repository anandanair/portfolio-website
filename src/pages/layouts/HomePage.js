import { Card, CardContent, Fade, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeCard from "../../components/HomeCard";

export default function HomePage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(true);

  const handleClick = () => {
    setFadeIn(false);
    setTimeout(() => {
      navigate("/design-portfolio");
    }, 1000);
  };

  return (
    <Stack spacing={5}>
      <Fade in={fadeIn} timeout={1000}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <HomeCard
              title="Design your Portfolio"
              justifyContent="flex-end"
              width="50%"
              alignItems="center"
              onClick={handleClick}
            />
          </Grid>
          <Grid item xs={4}>
            <HomeCard
              title="Update your Portfolio"
              className="updateCard"
              justifyContent="center"
              alignItems="flex-end"
            />
          </Grid>
          <Grid item xs={4}>
            <HomeCard
              title="Create new Portfolio"
              className="createCard"
              justifyContent="flex-start"
              width="50%"
              alignItems="center"
            />
          </Grid>
        </Grid>
      </Fade>
      <Card className="formCard">
        <CardContent sx={{ height: "40vh" }}></CardContent>
      </Card>
    </Stack>
  );
}
