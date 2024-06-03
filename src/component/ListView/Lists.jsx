import React, { useState, useEffect } from "react";
import {Box } from "@mui/material"
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { getCards, createCards,deleteList } from "../FetchApi";
import Cards from "../CardView/Cards";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

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
  display:'flex',
  textAlign: 'center',
 justifyContent: 'center'
};


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Lists({ listInfo,handleListChange }) {
  const [cardsData, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [delOpen, setDelOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleDelOpen = () =>   setDelOpen(true);
  
  const handleDelClose = () =>  setDelOpen(false);
  


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

 const handleListDelete=()=>{
      handleDelClose();
      deleteList(listInfo.id).then((data)=>{
        handleListChange(data);
      })
 }

 function setCardsData(id){
      let results=cardsData.filter(cards=>(cards.id!==id));
      // console.log(results);
        setCards(results);   
 }


  const handleTextValue = (e) => {
    setCardName(e.target.value);
  };

  return (
    <>
      <Card key={listInfo.id} variant="outlined" sx={{ bgcolor: "#ADD8E6", m: 2, width: "20%", height: "100%" }}>
           
           <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between' ,ml:3,fontWeight:'bold',fontFamily:'sans-serif'}}>
             {listInfo.name}
                <IconButton aria-label="delete" onClick={handleDelOpen} >
                <DeleteIcon  />
              </IconButton>
              </Box>
          
          
        
        
        {cardsData.map((card) => (
          <Cards  handleCards={setCardsData} cardInfo={card} />
        ))}


        <Button  onClick={handleOpen} variant="outlined" sx={{ m: 2, width: "85%", color: "black", bgcolor: "#FFF5EE" }} >
          + Add a Card
        </Button>

      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormControl component="form" onSubmit={handleCreateCard}>
            <FormLabel sx={{fontWeight:'bold'}}>Create Card</FormLabel>
            <TextField
              type="text"
              value={cardName}
              onChange={handleTextValue}
              fullWidth
              margin="normal"
              variant="filled"
              label=" Card Name"
            />
            <Button 
                sx={{ mt: 2, borderRadius: 2 }}
                color="secondary"
                backgroundColor="#c2c2c2"
                variant="outlined" type="submit">
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>


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
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
          <Typography gutterBottom>
             Are you sure you want to delete the list? 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={ handleListDelete}>
              Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default Lists;
