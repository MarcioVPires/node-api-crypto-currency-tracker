const express = require("express");
const router = express.Router();
const { list, getPrice } = require("./controller/listController");
const { signup } = require("./controller/userController");

// router.route("/login").get();
router.route("/signup").post(signup);
router.route("/list/:page/:result_amount").get(list);
// router.route("/search").get();
router.route("/price").get(getPrice);
// router.route("/history").get();
// router.route("/watchlist").get();

module.exports = router;
