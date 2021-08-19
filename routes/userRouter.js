const express = require("express");
import authMiddleware from "../middleware/authMiddleware";
import userMiddleware from "../middleware/userMiddleware";

const router = express.Router();

router.route("/signup").post(authMiddleware.signup);
router.route("/login").post(authMiddleware.login);

router
  .route("/customRecipes")
  .get(authMiddleware.protect, userMiddleware.getCustomRecipes);

router
  .route("/savedRecipes")
  .get(authMiddleware.protect, userMiddleware.getSavedRecipes);

router
  .route("/updatePassword")
  .patch(authMiddleware.protect, authMiddleware.changePassword);

router.patch(
  "/updateMyData",
  authMiddleware.protect,
  userMiddleware.updateMyData
);

module.exports = router;
