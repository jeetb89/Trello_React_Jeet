import React,{ useState }  from "react";
import {Box,TextField,FormLabel,FormControl, Popover,Button  } from "@mui/material";
import { createCheckItem } from "../FetchApi";



function CheckItemsPopOver({checkList,handleCheck}) {
    const [anchorEl, setAnchorEl] = useState(null);
 const [checkItemName,setCheckItemName]=useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckItemInput=(e)=>{
     setCheckItemName(e.target.value);
    
  }

  const handleCheckItem=(e)=>{
    e.preventDefault();

    createCheckItem(checkList.id,checkItemName)
    .then((data)=>{
        handleCheck(data)
        setCheckItemName('')
        handleClose()
    }).catch((err) => console.log(err));

  }


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
        <Button
           aria-describedby={id}
          variant="outlined" onClick={handleClick}
          sx={{ width: "80%", mt:2, height: "5%", display: "inline-block" }}
        >
          Add an Item
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
          <FormControl  sx={{width:'20vw',display:'flex',justifyContent:'center',textAlign:'center'}} component="form" onSubmit={handleCheckItem}>
          <FormLabel sx={{fontWeight:'bold', pt:3}}>Add Item</FormLabel>
            <TextField
              type="text"
              value={checkItemName}
              onChange={handleCheckItemInput}
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
  )
}

export default CheckItemsPopOver
