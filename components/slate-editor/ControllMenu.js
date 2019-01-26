import React from "react";
import { Button } from "reactstrap";

const ControllMenu = ({ isLoading, save }) => {
  return (
    <div className="controll-menu">
      <h1 className="title">Write your Story...</h1>
      <div className="status-box">Saved</div>
      <Button onClick={save} color="success">
        {isLoading ? "Saving..." : "Saved"}
      </Button>
    </div>
  );
};

export default ControllMenu;
