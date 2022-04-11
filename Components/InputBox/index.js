import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styles } from "./inputStyles";

export default function FormPropsTextFields({
  addGroup = false,
  enteredText = "",
  setEnteredText = () => {},
  addNewGroup = () => {},
  inputForTask = false,
  addNewTask = () => {},
  groupID = "",
}) {
  return (
    <Box
      component="form"
      sx={(theme) => ({
        ...styles.inputContainer,
        marginTop: addGroup ? 0 : "20px",
      })}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        inputForTask ? addNewTask(e, groupID) : addNewGroup(e);
      }}
    >
      <TextField
        required
        id="outlined-required"
        value={enteredText}
        onChange={(event) => {
          event.preventDefault();
          setEnteredText(event.target.value);
        }}
        sx={styles.inputArea}
        autoFocus={true}
      />
    </Box>
  );
}
