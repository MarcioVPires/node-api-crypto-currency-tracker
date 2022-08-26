const express = require("express");
const routes = express();
const { person } = require("./controller/person");

routes.post("/person", person);
routes.get("/populate-all-coins-id");

module.exports = routes;
