import React,{ useState }  from "react";
import {FormControl,Popover, FormLabel,Button,Box,TextField} from "@mui/material";
import { createCheckList } from "../FetchApi";


function CheckListPopOver({ card,handleCheck}) {
  const [anchorEl, setAnchorEl] = useState(null);
 const [checkListName,setCheckListName]=useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckListBox=(e)=>{
     setCheckListName(e.target.value);
  }

  const handleCheckList=(e)=>{
    e.preventDefault();

    createCheckList(card.id,checkListName)
    .then((data)=>{
        handleCheck(data)
        setCheckListName('')
        handleClose()
    }).catch((err) => console.log(err));

  }


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        variant="outlined"
        aria-describedby={id}  onClick={handleClick}
        sx={{ width: "70%",alignSelf:'center', height: "5%", display: "inline-block" }}
      >
        Add Checklist
      </Button>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
         <Box >
          <FormControl  sx={{width:'20vw',display:'flex',justifyContent:'center',textAlign:'center'}} component="form" onSubmit={handleCheckList}>
            <FormLabel sx={{fontWeight:'bold', pt:3}}>Add CheckList</FormLabel>
            <TextField
              type="text"
              value={checkListName}
              onChange={handleCheckListBox}
              variant="filled"
              label="Name"
              sx={{m:2}}
            />
            <Button  variant="contained" color="secondary" type="submit" sx={{m:2}}>
              Add
            </Button>
          </FormControl>
        </Box>



      </Popover>
    </>
  );
}

export default CheckListPopOver;
