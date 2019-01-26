import React from "react";
import { Button } from "reactstrap";

const ControllMenu = ({ isLoading, save }) => {
  return (
    <div className="controll-menu">
      <h1 className="title">Write your Story...</h1>
      <div className="status-box">Save</div>
      <Button disabled={isLoading} onClick={save} color="success">
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default ControllMenu;
