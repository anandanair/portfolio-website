import { Add, Close } from "@mui/icons-material";
import { Chip, Grid, IconButton, Snackbar, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useFirestore } from "../../contexts/FirestoreContext";

export default function SkillsForm(props) {
  const { getSkills, skills, setSkills, addSkill } = useFirestore();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [value, setValue] = useState("");

  //Functions
  const handleDelete = (skill) => {
    props.onObjectRemove(skill, "skills");
  };

  const handleChange = async (event) => {
    const val = event.target.value;
    setValue(val);
    if (val !== "") {
      await getSkills(val.toLowerCase().replace(/\s/g, ""), false);
    } else {
      setSkills([]);
    }
  };

  const handleAdd = (skill) => {
    const portfolioSkills = props.portfolio.skills;
    const existingSkill = portfolioSkills.find((obj) => obj.id === skill.id);
    if (existingSkill) {
      setMessage(`${skill.label} is already added to skills.`);
      setOpen(true);
    } else {
      props.onObjectAdd(skill, "skills");
    }
    setSkills([]);
    setValue(""); 
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddSkill = () => {
    let skill = {};
    skill.id = value.toLowerCase().replace(/\s/g, "");
    skill.label = value;
    addSkill(skill);
    handleAdd(skill);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Stack spacing={2} sx={{ width: "40vw" }}>
      <Grid
        sx={{ mb: 2 }}
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {props.portfolio.skills.map((skill, index) => (
          <Grid key={index} item>
            <Chip label={skill.label} onDelete={() => handleDelete(skill)} />
          </Grid>
        ))}
      </Grid>
      <TextField
        label="Search Skills"
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
      {value.length > 2 && skills.length < 1 && (
        <Stack direction="row">
          <Chip label={value} deleteIcon={<Add />} onDelete={handleAddSkill} />
        </Stack>
      )}
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {skills.map((skill, index) => (
          <Grid key={index} item>
            <Chip label={skill.label} onClick={() => handleAdd(skill)} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Stack>
  );
}
