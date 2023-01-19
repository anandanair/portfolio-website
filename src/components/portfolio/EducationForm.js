import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EducationModel } from "../../models/EducationModel";
import dayjs from "dayjs";
import StyledTextField from "../StyledTextField";
import { EducationErrorModel } from "../../models/EducationErrorModel";
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

export default function EducationForm(props) {
  const { isSmallSize, localTheme } = useLocalTheme();
  const color = localTheme === "dark" ? "#F7FBFC" : "#0A2647";
  const [education, setEducation] = useState(
    new EducationModel("", "", "", dayjs().subtract(1, "year"), dayjs(), "")
  );
  const [educationError, setEducationError] = useState(
    new EducationErrorModel("", "", "", "")
  );

  const handleChange = (value, name) => {
    validateFields(value, name);
    setEducation({
      ...education,
      [name]: value,
    });
  };

  function validateFields(value, name) {
    const errorKeys = Object.keys(educationError);
    let valid = true;
    if (errorKeys.includes(name)) {
      if (value === "") {
        setEducationError({
          ...educationError,
          [name]: `${name} is required`,
        });
        valid = false;
      } else {
        setEducationError({
          ...educationError,
          [name]: "",
        });
      }
      return valid;
    }
  }

  function submitForm() {
    let valid = true;
    const validationArray = ["schoolName", "field"];
    for (let index in validationArray) {
      const key = validationArray[index];
      const v = validateFields(education[key], key);
      if (!v) {
        valid = false;
      }
    }
    if (valid) {
      let newObject = Object.assign({}, education);
      newObject.startDate = Timestamp.fromDate(newObject.startDate.toDate());
      newObject.endDate = Timestamp.fromDate(newObject.endDate.toDate());
      newObject.id = uuidv4();
      props.onObjectAdd(newObject, "education");
      setEducation(
        new EducationModel("", "", "", dayjs().subtract(1, "year"), dayjs(), "")
      );
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

  useEffect(() => {
    props.setValidationArray(["education"]);
  }, []);

  return (
    <div>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {props.portfolio.education.map((edu, index) => (
          <Card key={index} sx={{ width: 1 }} className="formCard">
            <CardContent>
              <Typography variant="h6">
                {edu.schoolName} - {edu.field}
              </Typography>
              <Typography>{getDuration(edu.startDate, edu.endDate)}</Typography>
              <Typography sx={{ maxWidth: "40vw" }}>
                {edu.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {props.portfolio.education.length > 0 && <Divider sx={{ my: 2 }} />}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledTextField
          id="schoolName"
          label="School"
          type="text"
          variant="standard"
          value={education.schoolName}
          onChange={handleChange}
          multiline={false}
          required={true}
          error={educationError.schoolName}
        />
        <StyledTextField
          id="field"
          label="Field of Study"
          type="text"
          variant="standard"
          value={education.field}
          onChange={handleChange}
          multiline={false}
          required={true}
          error={educationError.field}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {!isSmallSize ? (
              <DesktopDatePicker
                disableFuture
                views={["year", "month"]}
                label="Start Date"
                value={education.startDate}
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
                value={education.endDate}
                onChange={(newValue) => handleChange(newValue, "endDate")}
                minDate={education.startDate}
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
          value={education.description}
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
