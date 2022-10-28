const express = require("express");
const router = express.Router();
const { authenticationFilter } = require("./middleware/authentication");
const { list, getPrice } = require("./controller/listController");
const {
  signup,
  login,
  getWatchList,
  setWatchList,
} = require("./controller/userController");

router.route("/login").get(login);
router.route("/signup").post(signup);
router.route("/list/:page/:result_amount").get(list);
// router.route("/search").get();
router.route("/price").get(getPrice);
// router.route("/history").get();

router.use(authenticationFilter);
router.route("/watchlist").get(getWatchList).post(setWatchList);

module.exports = router;
