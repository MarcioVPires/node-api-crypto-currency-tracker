const populateService = require("../service/populateService");

async function populateDBInitialData(req, res) {
  try {
    const data = await populateService.coinsByRank(req.body);
    console.log({ type: "controller", data });
    if (data.status === "error") {
      return res.status(501).json(data);
    }
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
}

module.exports = { populateDBInitialData };
