import React from "react";
import {
  FormControl,
  FormLabel,
  TextField,
  Modal,
  Button,
  Box,
} from "@mui/material";

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
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
};

function DialogBox({
  open,
  handleClose,
  handleSubmit,
  textValue,
  title,
  textChange,
}) {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormControl component="form" onSubmit={handleSubmit}>
            <FormLabel sx={{ mb: 2 }}>{title}</FormLabel>
            <TextField
              type="text"
              value={textValue}
              onChange={textChange}
              variant="filled"
              label="Title"
            />
            <Button
              variant="outlined"
              sx={{ mt: 2, borderRadius: 2 }}
              color="secondary"
              type="submit"
            >
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}

export default DialogBox;
