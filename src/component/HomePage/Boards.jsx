import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const boardStyles = {
  backgroundColor: "#6495ED",
  height: 100,
  width: 200,
  borderRadius: 2,
  m: 4,
};

function Boards({ boardInfo }) {
  return (
    <Link to={`/boards/${boardInfo.id}`} key={boardInfo.id}>
      <Button boardId={boardInfo.id} variant="contained" sx={boardStyles}>
        {boardInfo.name}
      </Button>
    </Link>
  );
}

export default Boards;
