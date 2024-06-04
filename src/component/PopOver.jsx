import React  from "react";
import {Box,TextField,FormLabel,FormControl, Popover,Button  } from "@mui/material";



function PopOver({id,open,anchorEl,handleClose,label,handleNew,name,handleNewInput }) {
  

  return (
    <>

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
          <FormControl  sx={{width:'20vw',display:'flex',justifyContent:'center',textAlign:'center'}} component="form" onSubmit={handleNew}>
          <FormLabel sx={{fontWeight:'bold', pt:3}}>{label}</FormLabel>
            <TextField
              type="text"
              value={name}
              onChange={handleNewInput}
              variant="filled"  
             label={label}
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

export default PopOver
