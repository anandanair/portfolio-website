import { Box } from "@mui/material";
import React, { useState } from "react";
import { PortfolioErrorModel } from "../models/PortfolioErrorModel";
import { useAuth } from "../contexts/AuthContext";
import CustomStepper from "../components/CustomStepper";
import PersonalDetailsForm from "../components/portfolio/PersonalDetailsForm";
import WorkExperienceForm from "../components/portfolio/WorkExperienceForm";
import EducationForm from "../components/portfolio/EducationForm";
import SkillsForm from "../components/portfolio/SkillsForm";
import ReferencesForm from "../components/portfolio/ReferencesForm";
import CertificatesForm from "../components/portfolio/CertificatesForm";
import AchievementsForm from "../components/portfolio/AchievementsForm";
import CustomStepperContent from "../components/CustomStepperContent";
import { useLocalTheme } from "../contexts/ThemeContext";
import { useFirestore } from "../contexts/FirestoreContext";
import { PortfolioModel } from "../models/PortfolioModel";

const steps = [
  {
    optional: false,
    label: "Personal Details",
    component: PersonalDetailsForm,
  },
  { optional: true, label: "Work Experience", component: WorkExperienceForm },
  { optional: false, label: "Education", component: EducationForm },
  { optional: true, label: "Skills", component: SkillsForm },
  { optional: true, label: "References", component: ReferencesForm },
  { optional: true, label: "Certificates", component: CertificatesForm },
  { optional: true, label: "Acheivements", component: AchievementsForm },
];

export default function CreatePortfolio() {
  const { currentUser } = useAuth();
  const { createPortfolio, getSkills } = useFirestore();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { isSmallSize } = useLocalTheme();
  const [validationArray, setValidationArray] = useState();
  const [portfolioError, setPortfolioError] = useState(
    new PortfolioErrorModel("", "", "", "")
  );

  const [portfolio, setPortfolio] = useState(
    new PortfolioModel(
      currentUser.displayName || "",
      currentUser.email,
      currentUser.phoneNumber || "",
      "",
      [],
      [],
      [],
      [],
      [],
      []
    )
  );

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let valid = true;
    for (let index in validationArray) {
      const key = validationArray[index];
      const v = validateFields(portfolio[key], key);
      if (!v) {
        valid = false;
      }
    }
    if (activeStep === 3) {
      getSkills("", true);
    }
    if (valid) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!steps[activeStep].optional) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    if (steps.length - 1 === activeStep) {
      handleFinish();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    }
  };

  const handleFinish = () => {
    createPortfolio(portfolio);
    // const errorKeys = Object.keys(portfolioError);
    // for (let key in portfolioError) {
    //   console.log(key);
    // }
  };

  const handleAddObject = (object, name) => {
    setPortfolio({
      ...portfolio,
      [name]: [...portfolio[name], object],
    });
  };

  const handleRemoveObject = (object, name) => {
    let originalArray = portfolio[name];
    let newArray = originalArray.filter((obj) => obj.id !== object.id);
    setPortfolio({
      ...portfolio,
      [name]: newArray,
    });
  };

  //Handle change in Fields
  function handleChange(value, name) {
    validateFields(value, name);
    setPortfolio({
      ...portfolio,
      [name]: value,
    });
  }

  function validateFields(value, name) {
    const isArray = Array.isArray(value);
    const errorKeys = Object.keys(portfolioError);
    if (errorKeys.includes(name)) {
      if (isArray ? value.length < 1 : value === "") {
        setPortfolioError({
          ...portfolioError,
          [name]: `${name} is required`,
        });

        return false;
      } else {
        setPortfolioError({
          ...portfolioError,
          [name]: "",
        });
        return true;
      }
    }
  }

  return (
    <Box sx={{ padding: "50px" }}>
      {!isSmallSize && (
        <CustomStepper
          activeStep={activeStep}
          steps={steps}
          skipped={skipped}
        />
      )}
      <CustomStepperContent
        portfolio={portfolio}
        step={steps[activeStep]}
        activeStep={activeStep}
        finalStep={activeStep === steps.length - 1}
        onChange={handleChange}
        onBack={handleBack}
        onSkip={handleSkip}
        onNext={handleNext}
        onFinish={handleFinish}
        portfolioError={portfolioError}
        setValidationArray={setValidationArray}
        onObjectAdd={handleAddObject}
        onObjectRemove={handleRemoveObject}
      >
        {steps[activeStep].component}
      </CustomStepperContent>
    </Box>
  );
}
