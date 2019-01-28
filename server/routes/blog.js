const express = require("express");
const router = express.Router();

const blogCtrl = require("../controllers/blog");
const authService = require("../services/auth");

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtrl.createBlog
);

router.get(
  "/me",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtrl.getUserBlogs
);

router.get("/:id", blogCtrl.getBlogById);

router.patch(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtrl.updateBlog
);

module.exports = router;
