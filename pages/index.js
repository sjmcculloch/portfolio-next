import React, { Component } from "react";
import axios from "axios";
import BaseLayout from "../components/layouts/BaseLayout";

class Index extends Component {
  static async getInitialProps() {
    let userData = {};
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      userData = response.data;
    } catch (err) {
      console.log(err);
    }
    return { initialData: [1, 2, 3, 4], userData };
  }
  constructor(props) {
    super(props);

    this.state = {
      title: "I am index page"
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  updateTitle = () => {
    this.setState({ title: "I am updated Index Page" });
  };

  render() {
    const { title } = this.state;

    const { userData } = this.props;
    return (
      <BaseLayout>
        <h1>I am a header subtitle</h1>
        <h2>{title}</h2>
        <h2>{userData.title}</h2>
        <button onClick={this.updateTitle}>Change Title</button>
      </BaseLayout>
    );
  }
}

export default Index;
