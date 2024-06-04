import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCards, createCards, deleteList } from "../FetchApi";
import Cards from "../CardView/Cards";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import DialogBox from "../DialogBox";
import {
  Box,
  DialogTitle,
  Card,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Dialog,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Lists({ listInfo, handleListChange }) {
  const [cardsData, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [delOpen, setDelOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelOpen = () => setDelOpen(true);

  const handleDelClose = () => setDelOpen(false);

  useEffect(() => {
    getCards(listInfo.id)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateCard = (e) => {
    e.preventDefault();
    createCards(cardName, listInfo.id)
      .then((newCard) => {
        setCards([...cardsData, newCard]);
        setCardName("");
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const handleListDelete = () => {
    handleDelClose();
    deleteList(listInfo.id).then((data) => {
      handleListChange(data);
    });
  };

  function setCardsData(id) {
    let results = cardsData.filter((cards) => cards.id !== id);
    // console.log(results);
    setCards(results);
  }

  const handleTextValue = (e) => {
    setCardName(e.target.value);
  };

  return (
    <>
      <Card
        key={listInfo.id}
        variant="outlined"
        sx={{
          bgcolor: "#ADD8E6",
          fontFamily: "sans-serif",
          m: 2,
          height: "fit-content",
          width: "20vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ml: 3,
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          {listInfo.name}
          <IconButton aria-label="delete" onClick={handleDelOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>

        {cardsData.map((card) => (
          <Cards handleCards={setCardsData} cardInfo={card} />
        ))}

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ m: 2, width: "85%", color: "black", bgcolor: "#FFF5EE" }}
        >
          + Add a Card
        </Button>
      </Card>

      <DialogBox
        open={open}
        handleClose={handleClose}
        handleSubmit={handleCreateCard}
        textValue={cardName}
        title="Create Card"
        textChange={handleTextValue}
      />

      <BootstrapDialog
        onClose={handleDelClose}
        aria-labelledby="customized-dialog-title"
        open={delOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete List
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDelClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to delete the list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleListDelete}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default Lists;
