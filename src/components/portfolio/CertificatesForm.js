import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CertificateModel } from "../../models/CertificateModel";
import dayjs from "dayjs";
import StyledTextField from "../StyledTextField";
import { CertificateErrorModel } from "../../models/CertificateErrorModel";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLocalTheme } from "../../contexts/ThemeContext";
import { Add } from "@mui/icons-material";
import { Timestamp } from "firebase/firestore";

export default function EducationForm(props) {
  const { isSmallSize, localTheme } = useLocalTheme();
  const color = localTheme === "dark" ? "#F7FBFC" : "#0A2647";
  const [certificate, setCertificate] = useState(
    new CertificateModel("", "", dayjs(), "")
  );
  const [certificateError, setCertificateError] = useState(
    new CertificateErrorModel("", "", "")
  );

  const handleChange = (value, name) => {
    validateFields(value, name);
    setCertificate({
      ...certificate,
      [name]: value,
    });
  };

  function validateFields(value, name) {
    const errorKeys = Object.keys(certificateError);
    let valid = true;
    if (errorKeys.includes(name)) {
      if (value === "") {
        setCertificateError({
          ...certificateError,
          [name]: `${name} is required`,
        });
        valid = false;
      } else {
        setCertificateError({
          ...certificateError,
          [name]: "",
        });
      }
      return valid;
    }
  }

  function submitForm() {
    let valid = true;
    const validationArray = Object.keys(certificateError);
    for (let index in validationArray) {
      const key = validationArray[index];
      const v = validateFields(certificate[key], key);
      if (!v) {
        valid = false;
      }
    }
    if (valid) {
      let newObject = Object.assign({}, certificate);
      newObject.issueDate = Timestamp.fromDate(newObject.issueDate.toDate());
      props.onObjectAdd(newObject, "certificates");
      setCertificate(new CertificateModel("", "", dayjs(), ""));
    }
  }

  return (
    <div>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {props.portfolio.certificates.map((cert, index) => (
          <Card key={index} sx={{ width: 1 }} className="formCard">
            <CardContent>
              <Typography variant="h6">
                {cert.name} - {cert.organization}
              </Typography>
              <Typography>
                {dayjs(cert.issueDate.toDate()).format("MMM, YYYY")}
              </Typography>
              <Link target="_blank" rel="noopener" href={cert.credentialURL}>
                Credential
              </Link>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {props.portfolio.certificates.length > 0 && <Divider sx={{ my: 2 }} />}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledTextField
          id="name"
          label="Name"
          type="text"
          variant="standard"
          value={certificate.name}
          onChange={handleChange}
          multiline={false}
          required={true}
          error={certificateError.name}
        />
        <StyledTextField
          id="organization"
          label="Issuing Organization"
          type="text"
          variant="standard"
          value={certificate.organization}
          onChange={handleChange}
          multiline={false}
          required={true}
          error={certificateError.organization}
        />

        {!isSmallSize ? (
          <DesktopDatePicker
            disableFuture
            views={["year", "month"]}
            label="Issue Date"
            value={certificate.issueDate}
            onChange={(newValue) => handleChange(newValue, "issueDate")}
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

        <StyledTextField
          id="credentialURL"
          label="Credential URL"
          type="text"
          variant="standard"
          value={certificate.credentialURL}
          onChange={handleChange}
          multiline={false}
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
