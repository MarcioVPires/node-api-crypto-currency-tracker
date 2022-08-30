const express = require("express");
const routes = express();
const axios = require("./service/axios");
const { person } = require("./controller/person");
const { populateDBInitialData } = require("./controller/populateController");

routes.get("/test", populateDBInitialData);
routes.post("/person", person);
routes.put("/dev/populate");

module.exports = routes;
