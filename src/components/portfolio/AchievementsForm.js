import React, { useState } from "react";
import { AchievementModel } from "../../models/AchievementModel";
import StyledTextField from "../StyledTextField";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AchievementsForm(props) {
  const [achievement, setAchievement] = useState(new AchievementModel("", ""));
  const [achievementError, setAchievementError] = useState(
    new AchievementModel("", "")
  );

  const handleChange = (value, name) => {
    validateFields(value, name);
    setAchievement({
      ...achievement,
      [name]: value,
    });
  };

  function validateFields(value, name) {
    const errorKeys = Object.keys(achievementError);
    let valid = true;
    if (errorKeys.includes(name)) {
      if (value === "") {
        setAchievementError({
          ...achievementError,
          [name]: `${name} is required`,
        });
        valid = false;
      } else {
        setAchievementError({
          ...achievementError,
          [name]: "",
        });
      }
      return valid;
    }
  }

  function submitForm() {
    let valid = true;
    const validationArray = Object.keys(achievementError);
    for (let index in validationArray) {
      const key = validationArray[index];
      const v = validateFields(achievement[key], key);
      if (!v) {
        valid = false;
      }
    }
    if (valid) {
      props.onObjectAdd(achievement, "achievements");
      setAchievement(new AchievementModel("", ""));
    }
  }

  return (
    <div>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {props.portfolio.achievements.map((ach, index) => (
          <Card key={index} sx={{ width: 1 }} className="formCard">
            <CardContent>
              <Typography variant="h6">{ach.name}</Typography>
              <Typography>{ach.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {props.portfolio.achievements.length > 0 && <Divider sx={{ my: 2 }} />}

      <StyledTextField
        id="name"
        label="Name"
        type="text"
        variant="standard"
        value={achievement.name}
        onChange={handleChange}
        multiline={false}
        required={true}
        error={achievementError.name}
      />
      <StyledTextField
        id="description"
        label="Description"
        type="text"
        variant="standard"
        value={achievement.description}
        onChange={handleChange}
        multiline={true}
        required={true}
        error={achievementError.description}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={submitForm}>
          <Add />
        </IconButton>
      </Box>
    </div>
  );
}
