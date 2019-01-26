import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";

import SlateEditor from "../components/slate-editor/Editor";

import { getBlogById } from "../actions";

class BlogEditor extends Component {
  static async getInitialProps({ query }) {
    const blogId = query.id;

    try {
      const blog = await getBlogById(blogId);
      return { blog };
    } catch (err) {
      return { err };
    }
  }

  state = {
    isSaving: false
  };

  render() {
    const { isSaving } = this.state;
    const { blog } = this.props;
    console.log(blog);

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor
            isLoading={isSaving}
            save={() => {
              console.log("update)");
            }}
          />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
