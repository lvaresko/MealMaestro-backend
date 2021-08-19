const express = require("express");
const ingredientMiddleware = require("../middleware/ingredientMiddleware");

const router = express.Router();

router.route("/").get(ingredientMiddleware.getGroceryList);

module.exports = router;
