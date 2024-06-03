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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function Content() {
  const [open, setOpen] = useState(false);
  const [boardName, setBoard] = useState("");
  const [allBoards, setAllBoard] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCard = (e) => {
    e.preventDefault();
    createBoard(boardName);

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
  }, [boardName]);

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
        }}
      >
       
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ backgroundColor: "#008080",borderRadius: 3, width: 200,m:4, height:100 }}
          >
            Create Card
          </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <FormControl component="form" onSubmit={handleCreateCard}>
              <FormLabel sx={{ mb: 2 }}>Create Board</FormLabel>
              <TextField
                type="text"
                value={boardName}
                onChange={handleChange}
                variant="filled"
                label="Board Title"
              />
              <Button
                variant="outlined"
                sx={{ mt: 2, borderRadius: 2 }}
                color="secondary"
                backgroundColor="#c2c2c2"
                type="submit"
              >
                Create
              </Button>
            </FormControl>
          </Box>
        </Modal>

        {allBoards.map((item) => (
          <Boards key={item.id} boardInfo={item} />
        ))}
      </Box>
    </>
  );
}

export default Content;
