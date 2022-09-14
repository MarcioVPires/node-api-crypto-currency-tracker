const populateService = require("../services/populateService");

async function populateDBInitialData(req, res) {
  try {
    console.log({ where: "controller", action: "call populateService" });
    const data = await populateService.coinsByRank(req.body);

    if (data.status === "error") {
      return res.status(501).json(data);
    }
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
}

module.exports = { populateDBInitialData };
