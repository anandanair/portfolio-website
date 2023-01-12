import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useLocalTheme } from "../contexts/ThemeContext";

export default function CustomStepper(props) {
  const { localTheme } = useLocalTheme();
  const CustomStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor:
          localTheme === "dark"
            ? "var(--light-primary-color)"
            : "var(--dark-primary-color)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor:
          localTheme === "dark"
            ? "var(--light-primary-color)"
            : "var(--dark-primary-color)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#9b9ba13a",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const isStepSkipped = (step) => {
    return props.skipped.has(step);
  };

  return (
    <div>
      <Stepper
        activeStep={props.activeStep}
        connector={<CustomStepConnector />}
      >
        {props.steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (step.optional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
