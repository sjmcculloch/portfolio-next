import React, { Component } from "react";
import axios from "axios";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { withRouter } from "next/router";

class Portfolio extends Component {
  static async getInitialProps({ query }) {
    const postId = query.id;
    let post = {};
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      post = response.data;
    } catch (err) {
      console.log(err);
    }
    return { post };
  }

  render() {
    const { post } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h2>{post.title}</h2>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);
