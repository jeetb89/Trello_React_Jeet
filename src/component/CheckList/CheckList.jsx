import React, { useEffect, useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Button,
  Box,
  Typography,
  LinearProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import CheckItems from "../CheckItems/CheckItems";
import PopOver from "../PopOver";
import { deleteCheckList, getCheckItems, createCheckItem } from "../FetchApi";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{ height: "1.5vh", borderRadius: 1 }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function CheckList({ handleCheckListDelete, checkList, cardObj }) {
  const [checkItems, setCheckItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [checkItemName, setCheckItemName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getCheckItems(checkList.id)
      .then((data) => {
        setCheckItems(data);
        updateProgress(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckItemInput = (e) => {
    setCheckItemName(e.target.value);
  };

  const handleCheckItem = (e) => {
    e.preventDefault();

    createCheckItem(checkList.id, checkItemName)
      .then((data) => {
        handleNewCheckItem(data);
        setCheckItemName("");
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const updateProgress = (items) => {
    const totalCheckItems = items.length;
    const checkedLength = items.filter(
      (checkItem) => checkItem.state === "complete"
    ).length;
    const percentage =
      totalCheckItems === 0 ? 0 : (checkedLength / totalCheckItems) * 100;
    setProgress(percentage);
  };

  const handleDelete = () => {
    const checkListId = checkList.id;
    deleteCheckList(checkListId)
      .then(() => {
        handleCheckListDelete(checkListId);
      })
      .catch((err) => console.log(err));
  };

  const handleNewCheckItem = (data) => {
    const newCheckItems = [...checkItems, data];
    setCheckItems(newCheckItems);
    updateProgress(newCheckItems);
  };

  const handleDeleteCheckItem = (id) => {
    const newCheckItems = checkItems.filter((checkItem) => checkItem.id !== id);
    setCheckItems(newCheckItems);
    updateProgress(newCheckItems);
  };

  const handleCheckChange = (itemId, newState) => {
    const updatedItems = checkItems.map((item) =>
      item.id === itemId ? { ...item, state: newState } : item
    );
    setCheckItems(updatedItems);
    updateProgress(updatedItems);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid transparent",
          backgroundColor: "#ffff",
          borderRadius: 3,
          mt: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 0,
            alignItems: "center",
          }}
        >
          <FormGroup>
            <FormControlLabel
              disabled
              control={<CheckBoxIcon />}
              label={checkList.name}
            />
          </FormGroup>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: "90%", m: 2 }}>
          <LinearProgressWithLabel color="success" value={progress} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {checkItems.map((checkItem) => (
            <CheckItems
              key={checkItem.id}
              checkItem={checkItem}
              cardObj={cardObj}
              handleCheckChange={handleCheckChange}
              handleDeleteCheckItem={handleDeleteCheckItem}
            />
          ))}

          <Button
            aria-describedby={id}
            variant="outlined"
            onClick={handleClick}
            sx={{ width: "80%", mt: 2, height: "5%", display: "inline-block" }}
          >
            Add an Item
          </Button>

          <PopOver
            id={id}
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
            label={"CheckItem Name"}
            handleNew={handleCheckItem}
            name={checkItemName}
            handleNewInput={handleCheckItemInput}
          />
        </Box>
      </Box>
    </>
  );
}

export default CheckList;
