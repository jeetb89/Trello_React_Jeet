import { useParams } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import { FormControl, FormLabel, Modal,TextField,Box,Button} from "@mui/material";
import { createLists,FetchApi  } from "../FetchApi";
import Lists from '../ListView/Lists'

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

function BoardInfo() {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const[listName,setListName]=useState(''); 

  useEffect(() => {
    FetchApi(id)
      .then((data) => {
        setLists(data);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function handleListName(e){     
    setListName(e.target.value);
  }


  function handleFormSubmit(e){
       e.preventDefault();
       createLists(listName,id)
       .then((data) => {
        setLists([...lists,data]);
      })
      .catch((err) => console.log(err));
       handleClose(); 
      setListName('')
  }
   
  function listDisposed(deletedlist){
       const filteredLists =lists.filter((list)=> list.id!==deletedlist.id)
    
       setLists(filteredLists);
  }


  return (
    <>
      <Box component="span"  sx={{display: 'flex',overflowX: 'auto', whiteSpace: 'nowrap'}} >
        {lists.map((list) => (
          <Lists key={list.id} handleListChange={listDisposed} listInfo={list} />
        ))}

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            m: 2,
            width: "20%",
            height: "10%",
            color: "#ffff",
            backgroundColor: "#4682B4",
            border: "2px solid #f0f0f0",
            fontWeight:'bold'
          }}
        >
          + Add a List
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormControl component="form" onSubmit={handleFormSubmit}>
            <FormLabel sx={{ mb: 2,fontWeight:'bold' }}>Create List</FormLabel>
            <TextField
              type="text"
              value={listName}
              onChange={handleListName}
              variant="filled"
              label="List Name"
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
    </>
  );
}

export default BoardInfo;
