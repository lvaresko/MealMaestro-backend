const express = require("express");
import authMiddleware from "../middleware/authMiddleware";
import userMiddleware from "../middleware/userMiddleware";

const router = express.Router();

router.route("/signup").post(authMiddleware.signup);
router.route("/login").post(authMiddleware.login);
router.route("/info").get(userMiddleware.getAllUsers);

router.route("/:id/customRecipes").get(userMiddleware.getCustomRecipes);
router.route("/:id/savedRecipes").get(userMiddleware.getSavedRecipes);

router
  .route("/updatePassword")
  .patch(authMiddleware.protect, authMiddleware.changePassword);

router
  .route("/updateMyData")
  .patch(authMiddleware.protect, userMiddleware.updateMyData);

module.exports = router;
