require("dotenv").config();

const express = require("express");
const app = express();
const mainRoutes = require("./routes");
const devRoutes = require("./dev/routes");
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use("/dev", devRoutes);
app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
app.timeout = 10000;
