const express = require("express");
const router = express.Router();
const { authenticationFilter } = require("./middleware/authentication");
const { list, getPrice, searchItem } = require("./controller/listController");
const { signup, login } = require("./controller/userController");
const {
  getWatchList,
  setWatchList,
} = require("./controller/watchlistController");

router.route("/login").get(login);
router.route("/signup").post(signup);
router.route("/list/:page/:result_amount").get(list);
router.route("/search").get(searchItem);
router.route("/price").get(getPrice);
// router.route("/history").get();

router.use(authenticationFilter);
router.route("/watchlist").get(getWatchList).post(setWatchList);

module.exports = router;
