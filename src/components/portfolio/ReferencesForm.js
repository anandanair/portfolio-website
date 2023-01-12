import React, { useState } from "react";
import { ReferencesModel } from "../../models/ReferencesModel";
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

export default function ReferencesForm(props) {
  const [reference, setReferences] = useState(
    new ReferencesModel("", "", "", "")
  );
  const [referenceError, setReferencesError] = useState(
    new ReferencesModel("", "", "", "")
  );

  const handleChange = (value, name) => {
    validateFields(value, name);
    setReferences({
      ...reference,
      [name]: value,
    });
  };

  function validateFields(value, name) {
    const errorKeys = Object.keys(referenceError);
    let valid = true;
    if (errorKeys.includes(name)) {
      if (value === "") {
        setReferencesError({
          ...referenceError,
          [name]: `${name} is required`,
        });
        valid = false;
      } else {
        setReferencesError({
          ...referenceError,
          [name]: "",
        });
      }
      return valid;
    }
  }

  function submitForm() {
    let valid = true;
    const validationArray = ["name", "companyName", "position", "phoneNumber"];
    for (let index in validationArray) {
      const key = validationArray[index];
      const v = validateFields(reference[key], key);
      if (!v) {
        valid = false;
      }
    }
    if (valid) {
      props.onObjectAdd(reference, "references");
      setReferences(new ReferencesModel("", "", "", ""));
    }
  }

  return (
    <div>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {props.portfolio.references.map((ref, index) => (
          <Card key={index} sx={{ width: 1 }} className="formCard">
            <CardContent>
              <Typography variant="h6">
                {ref.name} - {ref.companyName}
              </Typography>
              <Typography>{ref.position}</Typography>
              <Typography sx={{ maxWidth: "40vw" }}>
                {ref.phoneNumber}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {props.portfolio.references.length > 0 && <Divider sx={{ my: 2 }} />}

      <StyledTextField
        id="name"
        label="Name"
        type="text"
        variant="standard"
        value={reference.name}
        onChange={handleChange}
        multiline={false}
        required={true}
        error={referenceError.name}
      />
      <StyledTextField
        id="companyName"
        label="Company"
        type="text"
        variant="standard"
        value={reference.companyName}
        onChange={handleChange}
        multiline={false}
        required={true}
        error={referenceError.companyName}
      />
      <StyledTextField
        id="position"
        label="Position"
        type="text"
        variant="standard"
        value={reference.position}
        onChange={handleChange}
        multiline={false}
        required={true}
        error={referenceError.position}
      />
      <StyledTextField
        id="phoneNumber"
        label="Phone Number"
        type="text"
        variant="standard"
        value={reference.phoneNumber}
        onChange={handleChange}
        multiline={false}
        required={true}
        error={referenceError.phoneNumber}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={submitForm}>
          <Add />
        </IconButton>
      </Box>
    </div>
  );
}
