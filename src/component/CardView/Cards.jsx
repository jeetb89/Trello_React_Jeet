import React from "react";
import {Button,styled,Box,Typography,Dialog,IconButton,DialogTitle,DialogContent,DialogActions,FormGroup } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { deleteCard, getCheckList,createCheckList } from "../FetchApi";
import CheckList from "../CheckList/CheckList";
import CheckListPopOver from "../CheckList/CheckListPopOver";




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Cards({ cardInfo, handleCards }) {
  const [delCard, setDelCard] = useState(false);
  const [checkLists, setAllCheckList] = useState([]);
  const [openChecklists, setOpenChecklists] = useState(false);
  
  
  useEffect(() => {
    getCheckList(cardInfo.id)
      .then((data) => setAllCheckList(data))
      .catch((err) => console.log(err));
  }, []);

  const handleCheckListOpen = () => {
    setOpenChecklists(true);
  };
  const handleCheckListClose = () => {
    setOpenChecklists(false);
  };


  const handleDelOpen = () => setDelCard(true);
  const handleDelClose = () => setDelCard(false);

  const handleDeleteCard = () => {
    handleDelClose();
    const id = cardInfo.id;
    deleteCard(id);
    handleCards(id);
  };



const handleNewCheckList=(data)=>{
     setAllCheckList([...checkLists,data]);         
     console.log('reached')
}

const handleDeleteCheckList=(id)=>{
     const newCheckList =checkLists.filter((checkList)=>checkList.id!==id)
     setAllCheckList(newCheckList);
  
}
 

  return (
    <>
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFF5EE",
          color: "black",
          borderRadius: 2,
        }}
      >
        <Box
          key={cardInfo.id}
          sx={{
            pl: 2,
            width: "100%",
            cursor: "pointer",
           
          }}
          onClick={ handleCheckListOpen}
        >
          {cardInfo.name}
        </Box>
        <IconButton aria-label="settings" onClick={handleDelOpen}>
          <MoreVertIcon />
        </IconButton>
      </Box>



      <BootstrapDialog
        onClose={handleDelClose}
        aria-labelledby="customized-dialog-title"
        open={delCard}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete Card
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
          <Typography gutterBottom>Do you want to delete the card?</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteCard}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>




      <BootstrapDialog
        onClose={handleCheckListClose }
        aria-labelledby="customized-dialog-title"
        open={openChecklists} 
      >
        <DialogTitle sx={{ m: 0, p: 2,width:'38vw' }} id="customized-dialog-title">
          Check List
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCheckListClose }
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          <DialogContent>
          <FormGroup sx={{mt:1}}>
         
      <CheckListPopOver card={cardInfo} handleCheck={handleNewCheckList}/>
           {
              checkLists.map(checkList=>(
                <CheckList key={checkList.id} cardObj={cardInfo}  handleCheckListDelete={handleDeleteCheckList} checkList={checkList}>

                </CheckList>
              ))
            }
          
          </FormGroup>
           

          </DialogContent>
      
      </BootstrapDialog>

    </>
  );
}

export default Cards;
