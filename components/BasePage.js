import React from "react";
import { Container } from "reactstrap";

const BasePage = props => {
  const { children, className, title, containerClass } = props;

  return (
    <div className={`base-page ${className}`}>
      <Container className={containerClass}>
        {title && (
          <div className="page-header">
            <h1 className="page-header-title">{title}</h1>
          </div>
        )}
        {children}
      </Container>
    </div>
  );
};

BasePage.defaultProp = {
  className: "",
  containerClass: ""
};

export default BasePage;
