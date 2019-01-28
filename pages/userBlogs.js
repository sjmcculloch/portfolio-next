import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Container, Row, Col } from "reactstrap";
import { Link } from "../routes";
import PortButtonDropdown from "../components/ButtonDropdown";

import withAuth from "../components/hoc/withAuth";

import { getUserBlogs } from "../actions";

class UserBlogs extends Component {
  static async getInitialProps({ req }) {
    let blogs = [];

    try {
      blogs = await getUserBlogs(req);
    } catch (err) {
      console.error(err);
    }

    return { blogs };
  }

  seperateBlogs(blogs) {
    const published = [];
    const draft = [];

    blogs.forEach(blog => {
      blog.status === "draft" ? draft.push(blog) : published.push(blog);
    });

    return { published, draft };
  }

  createStatus(status) {
    return status === "draft"
      ? { view: "Publish Story", value: "published" }
      : { view: "Make a Draft", value: "draft" };
  }

  dropdownOptions = blog => {
    const status = this.createStatus(blog.status);

    return [
      {
        text: status.view,
        handlers: {
          onClick: () => this.changeBlogStatus(status.value, blog._id)
        }
      },
      {
        text: "Delete",
        handlers: { onClick: () => this.deleteBlogWarning(blog._id) }
      }
    ];
  };

  renderBlogs(blogs) {
    return (
      <ul className="user-blogs-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <Link route={`/blogs/${blog._id}/edit`}>
              <a>{blog.title}</a>
            </Link>
            <PortButtonDropdown items={this.dropdownOptions(blog)} />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { blogs } = this.props;
    const { published, draft } = this.seperateBlogs(blogs);

    return (
      <BaseLayout headerType={"landing"} {...this.props.auth}>
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-user-page">
          <Row>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-status-title">Published Blogs</h2>
              {this.renderBlogs(published)}
            </Col>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-status-title">Draft Blogs</h2>
              {this.renderBlogs(draft)}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(UserBlogs);
