import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import StyledTextField from "../StyledTextField";

export default function PersonalDetailsForm(props) {
  useEffect(() => {
    props.setValidationArray(["fullName", "email", "phoneNumber"]);
  }, []);

  return (
    <div>
      <StyledTextField
        id="fullName"
        required={true}
        label="Full Name"
        type="text"
        variant="standard"
        value={props.portfolio.fullName}
        onChange={props.onChange}
        multiline={false}
        error={props.portfolioError.fullName}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyledTextField
            id="email"
            label="Email"
            type="text"
            variant="standard"
            value={props.portfolio.email}
            onChange={props.onChange}
            multiline={false}
            required={true}
            error={props.portfolioError.email}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            id="phoneNumber"
            label="Phone Number"
            type="text"
            variant="standard"
            value={props.portfolio.phoneNumber}
            onChange={props.onChange}
            multiline={false}
            required={true}
            error={props.portfolioError.phoneNumber}
          />
        </Grid>
      </Grid>
      <StyledTextField
        id="summary"
        label="Summary"
        type="text"
        variant="outlined"
        value={props.portfolio.summary}
        onChange={props.onChange}
        multiline={true}
        required={false}
        error=""
      />
    </div>
  );
}
