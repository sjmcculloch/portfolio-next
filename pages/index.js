import React, { Component } from "react";
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
        <h1>I am a header subtitle</h1>
      </BaseLayout>
    );
  }
}

export default Index;
