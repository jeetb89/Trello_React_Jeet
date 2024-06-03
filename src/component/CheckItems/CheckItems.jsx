import React, { useState, useEffect } from "react";
import {Box,Checkbox} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { changeItemCheckbox, deleteCheckItem } from "../FetchApi";

function CheckItems({ checkItem, handleCheckChange, handleDeleteCheckItem, cardObj }) {
  const [checkedState, setCheckedState] = useState(null);

  useEffect(() => {
    setCheckedState(checkItem.state === 'complete');
  }, []);



  function handleDelete() {
    console.log(checkItem);
    const checkItemId = checkItem.id;
    deleteCheckItem(checkItem.idChecklist, checkItemId)
      .then(() => {
        handleDeleteCheckItem(checkItemId);
      })
      .catch((err) => console.log(err));
  }

  
  function handleCheckChangeLocal() {
    const newCheckState = !checkedState;
    const checkState = newCheckState ? 'complete' : 'incomplete';
    setCheckedState(newCheckState);
    changeItemCheckbox(cardObj.id, checkItem.id, checkState)
      .then(() => {
        handleCheckChange(checkItem.id, checkState);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          alignItems: "center",
        }}
      >
        <Box>
          <Checkbox
            fontSize="inherit"
            checked={checkedState}
            color="default"
            onChange={handleCheckChangeLocal}
          />
          {checkItem.name}
        </Box>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </>
  );
}

export default CheckItems;
