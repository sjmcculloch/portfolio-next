const routes = (module.exports = require("next-routes")());

routes.add("portfolio", "/portfolio/:id");
routes.add("portfolioEdit", "/portfolios/:id/edit");
routes.add("blogEditorUpdate", "/blogs/:id/edit");
