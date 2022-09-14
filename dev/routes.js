const express = require("express");
const router = express.Router();
const populate = require("./controllers/populateController");

router.use((req, res, next) => {
  process.env.DEV_MODE === "false" ? res.redirect("/") : next();
});

router.route("/populate").get(populate.populateDBInitialData);

module.exports = router;
