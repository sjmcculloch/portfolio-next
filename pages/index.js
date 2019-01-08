import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseLayout from "../components/layouts/BaseLayout";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "I am index page"
    };
  }

  render() {
    return (
      <BaseLayout>
        <Container>
          <Button color="danger">Button</Button>
        </Container>
      </BaseLayout>
    );
  }
}

export default Index;
