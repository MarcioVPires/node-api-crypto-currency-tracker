require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes");
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
