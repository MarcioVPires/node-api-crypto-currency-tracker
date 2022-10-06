const { getPageResults, checkOutdatedData } = require("../service/list");

async function list(req, res) {
  try {
    const outDatedData = await checkOutdatedData(req);
    // const listResult = await getPageResults(req);
    // if (!listResult) {
    //   res.json("There's no list");
    // }
    // res.json(listResult);
    res.json(outDatedData);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { list };
