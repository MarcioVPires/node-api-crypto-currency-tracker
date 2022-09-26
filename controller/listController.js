const { getPageResults } = require("../service/list");

async function list(req, res) {
  try {
    const listResult = await getPageResults(req);
    if (!listResult) {
      res.json("There's no list");
    }
    res.json(listResult);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { list };
