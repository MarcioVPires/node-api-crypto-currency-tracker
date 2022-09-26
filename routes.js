const express = require("express");
const router = express.Router();
const { list } = require("./controller/listController");

router.route("/").get((req, res) => res.json("Main -> /"));

router.route("/test").get((req, res) => res.json("Test -> /test"));

router.route("/list/:page/:result_amount").get(list);

module.exports = router;
