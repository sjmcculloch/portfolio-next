const express = require("express");
const router = express.Router();

const portfolioCtrl = require("../controllers/portfolio");
const authService = require("../services/auth");

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  portfolioCtrl.savePortfolio
);

router.get(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  portfolioCtrl.getPortfolios
);

router.patch(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  portfolioCtrl.updatePortfolio
);

router.delete(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  portfolioCtrl.deletePortfolio
);

module.exports = router;
