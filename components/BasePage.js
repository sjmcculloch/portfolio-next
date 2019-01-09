import React from "react";
import { Container } from "reactstrap";

const BasePage = props => {
  const { children, className } = props;

  return (
    <div className={`base-page ${className}`}>
      <Container>{children}</Container>
    </div>
  );
};

BasePage.defaultProp = {
  className: ""
};

export default BasePage;
