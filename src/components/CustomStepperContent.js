import { ArrowBack, ArrowForward, Done } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useLocalTheme } from "../contexts/ThemeContext";

export default function CustomStepperContent(props) {
  const { viewportHeight } = useLocalTheme();

  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: `${((viewportHeight - 50) / viewportHeight) * 80}vh`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Stack spacing={2}>
            <Card className="formCard">
              <CardHeader align="left" title={props.step.label} />
            </Card>
            <Card className="formCard">
              <CardContent align="left">
                <Box component="form">
                  {
                    <props.children
                      portfolio={props.portfolio}
                      onChange={props.onChange}
                      portfolioError={props.portfolioError}
                      setValidationArray={props.setValidationArray}
                      onObjectAdd={props.onObjectAdd}
                      onObjectRemove={props.onObjectRemove}
                    />
                  }
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <IconButton
                    disabled={props.activeStep === 0}
                    onClick={props.onBack}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {props.step.optional && (
                    <Button
                      variant="text"
                      onClick={props.onSkip}
                      sx={{ mr: 1 }}
                    >
                      Skip
                    </Button>
                  )}
                  <IconButton
                    onClick={props.finalStep ? props.onFinish : props.onNext}
                  >
                    {props.finalStep ? <Done /> : <ArrowForward />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Fade>
      </Box>
    </React.Fragment>
  );
}
