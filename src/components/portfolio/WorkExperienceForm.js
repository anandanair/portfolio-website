import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { WorkExperienceModel } from "../../models/WorkExperienceModel";
import dayjs from "dayjs";
import StyledTextField from "../StyledTextField";
import { WorkExperienceErrorModel } from "../../models/WorkExperienceErrorModel";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLocalTheme } from "../../contexts/ThemeContext";
import { Add } from "@mui/icons-material";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function WorkExperienceForm(props) {
  const { isSmallSize, localTheme } = useLocalTheme();
  const color = localTheme === "dark" ? "#F7FBFC" : "#0A2647";
  const [workExp, setWorkExp] = useState(
    new WorkExperienceModel(
      "",
      "",
      "",
      dayjs().subtract(1, "year"),
      dayjs(),
      ""
    )
  );
  const [workExpError, setWorkExpError] = useState(
    new WorkExperienceErrorModel("", "", "", "")
  );

  const handleChange = (value, name) => {
    validateFields(value, name);
    setWorkExp({
      ...workExp,
      [name]: value,
    });
  };

  function validateFields(value, name) {
    const errorKeys = Object.keys(workExpError);
    let valid = true;
    if (errorKeys.includes(name)) {
      if (value === "") {
        setWorkExpError({
          ...workExpError,
          [name]: `${name} is required`,
        });
        valid = false;
      } else {
        setWorkExpError({
          ...workExpError,
          [name]: "",
        });
      }
      return valid;
    }
  }

  function getDuration(startDate, endDate) {
    let newStartDate = dayjs(startDate.toDate());
    let newEndDate = dayjs(endDate.toDate());
    const durationInMonths = newEndDate.diff(newStartDate, "month");

    const years = Math.floor(durationInMonths / 12);
    const months = durationInMonths % 12;
    const durationString = `${years} ${
      years > 1 ? "years" : "year"
    } ${months} ${months > 1 ? "months" : "month"}`;
    return durationString;
  }

  function submitForm() {
    let valid = true;
    const validationArray = ["companyName", "position"];
    for (let index in validationArray) {
      const key = validationArray[index];
      const v = validateFields(workExp[key], key);
      if (!v) {
        valid = false;
      }
    }
    if (valid) {
      let newObject = Object.assign({}, workExp);
      newObject.duration = getDuration(newObject.startDate, newObject.endDate);
      newObject.startDate = Timestamp.fromDate(newObject.startDate.toDate());
      newObject.endDate = Timestamp.fromDate(newObject.endDate.toDate());
      newObject.id = uuidv4();
      props.onObjectAdd(newObject, "workExperience");
      setWorkExp(
        new WorkExperienceModel(
          "",
          "",
          "",
          dayjs().subtract(1, "year"),
          dayjs(),
          ""
        )
      );
    }
  }

  return (
    <div>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {props.portfolio.workExperience.map((exp, index) => (
          <Card key={index} sx={{ width: 1 }} className="formCard">
            <CardContent>
              <Typography variant="h6">
                {exp.position} - {exp.companyName}
              </Typography>
              <Typography>{getDuration(exp.startDate, exp.endDate)}</Typography>
              <Typography sx={{ maxWidth: "40vw" }}>
                {exp.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {props.portfolio.workExperience.length > 0 && <Divider sx={{ my: 2 }} />}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledTextField
          id="position"
          label="Position"
          type="text"
          variant="standard"
          value={workExp.position}
          onChange={handleChange}
          multiline={false}
          required={true}
          error={workExpError.position}
        />
        <StyledTextField
          id="companyName"
          label="Company"
          type="text"
          variant="standard"
          value={workExp.companyName}
          onChange={handleChange}
          multiline={false}
          required={true}
          error={workExpError.companyName}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {!isSmallSize ? (
              <DesktopDatePicker
                disableFuture
                views={["year", "month"]}
                label="Start Date"
                value={workExp.startDate}
                onChange={(newValue) => handleChange(newValue, "startDate")}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    fullWidth
                    required
                    sx={{
                      input: {
                        color: color,
                        fontFamily: "Antic Slab",
                      },
                      textarea: {
                        color: color,
                        fontFamily: "Antic Slab",
                      },
                      mb: 3,
                    }}
                    {...params}
                  />
                )}
              />
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item xs={6}>
            {!isSmallSize ? (
              <DesktopDatePicker
                views={["year", "month"]}
                label="End Date"
                value={workExp.endDate}
                onChange={(newValue) => handleChange(newValue, "endDate")}
                minDate={workExp.startDate}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    fullWidth
                    required
                    sx={{
                      input: {
                        color: color,
                        fontFamily: "Antic Slab",
                      },
                      textarea: {
                        color: color,
                        fontFamily: "Antic Slab",
                      },
                      mb: 3,
                    }}
                    {...params}
                  />
                )}
              />
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
        <StyledTextField
          id="description"
          label="Description"
          type="text"
          variant="outlined"
          value={workExp.description}
          onChange={handleChange}
          multiline={true}
          required={false}
          error=""
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={submitForm}>
            <Add />
          </IconButton>
        </Box>
      </LocalizationProvider>
    </div>
  );
}
