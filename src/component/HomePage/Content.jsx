import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  TextField,
  Modal,
  Button,
  Box,
} from "@mui/material";
import Boards from "./Boards";
import { getAllBoard, createBoard } from "../FetchApi";
import DialogBox from "../DialogBox";

function Content() {
  const [open, setOpen] = useState(false);
  const [boardName, setBoard] = useState("");
  const [allBoards, setAllBoard] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBoard = (e) => {
    e.preventDefault();
    createBoard(boardName)
      .then((data) => {
        console.log(data);
        setAllBoard((prevBoards) => [...prevBoards, data]);
      })
      .catch((err) => {
        console.log(err);
      });

    setBoard("");
    handleClose();
  };

  useEffect(() => {
    getAllBoard()
      .then((data) => {
        setAllBoard(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setBoard(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          m: 2,
          pt: 4,
          fontFamily: "sans-serif",
        }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            backgroundColor: "#008080",
            borderRadius: 3,
            width: 200,
            m: 4,
            height: 100,
          }}
        >
          Create Board
        </Button>

        <DialogBox
          open={open}
          handleClose={handleClose}
          handleSubmit={handleCreateBoard}
          textValue={boardName}
          title="Create Board"
          textChange={handleChange}
        />

        {allBoards.length > 0 ? (
          allBoards.map((item) => <Boards key={item.id} boardInfo={item} />)
        ) : (
          <Box
            sx={{
              backgroundColor: "#6495ED",
              height: 100,
              width: 200,
              borderRadius: 2,
              m: 4,
              color: "#ffff",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {" "}
            Loading Boards...
          </Box>
        )}
      </Box>
    </>
  );
}

export default Content;
