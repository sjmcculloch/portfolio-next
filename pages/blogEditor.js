import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";
import { toast } from "react-toastify";

import SlateEditor from "../components/slate-editor/Editor";

import { createBlog } from "../actions";

class BlogEditor extends Component {
  state = {
    isSaving: false,
    lockId: Math.floor(1000 + Math.random() * 9000)
  };

  saveBlog = (story, heading) => {
    const { lockId } = this.state;
    const blog = {};
    blog.title = heading.title;
    blog.subTitle = heading.subTitle;
    blog.story = story;

    this.setState({ isSaving: true });
    createBlog(blog, lockId)
      .then(createdBlog => {
        this.setState({ isSaving: false });
        toast.success("Blog Saved Succesfuly!");
        Router.pushRoute(`/blogs/${createdBlog._id}/edit`);
      })
      .catch(err => {
        const message = err.message || "Server Error!";
        toast.error(
          "Unexpected Error, Copy your progress and refresh browser please."
        );
        console.error(message);
      });
  };

  render() {
    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor isLoading={isSaving} save={this.saveBlog} />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
