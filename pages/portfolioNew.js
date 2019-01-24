import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";

import { Row, Col } from "reactstrap";

import { createPortfolio } from "../actions";

import withAuth from "../components/hoc/withAuth";

class PortfolioNew extends Component {
  savePortfolio = portfolioData => {
    createPortfolio(portfolioData)
      .then(portfolio => {
        console.log(portfolio);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create New Page">
          <Row>
            <Col md="6">
              <PortfolioCreateForm onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);
