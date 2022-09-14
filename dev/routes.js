const express = require("express");
const router = express.Router();
const populate = require("./controllers/populateController");

router.use((req, res, next) => {
  if (process.env.DEV_MODE !== true) {
    res.redirect("/");
  } else {
    next();
  }
});

router.route("/populate").get(populate.populateDBInitialData);

module.exports = router;
