const routes = (module.exports = require("next-routes")());

routes.add("portfolio", "/portfolio/:id");
routes.add("portfolioEdit", "/portfolio/:id/edit");
