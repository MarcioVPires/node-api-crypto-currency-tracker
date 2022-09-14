const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => res.json("Main -> /"));
router.route("/test").get((req, res) => res.json("Test -> /test"));

module.exports = router;
