const {
  getPageResults,
  checkOutdatedData,
  updateData,
} = require("../service/list");

async function list(req, res) {
  try {
    const outDatedData = await checkOutdatedData(req);
    console.log(outDatedData);
    if (outDatedData.length > 1) {
      await updateData(outDatedData);
    }

    const listResult = await getPageResults(req);
    if (!listResult) {
      res.json("There's no list");
    }
    res.json(listResult);

    //res.json(outDatedData);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { list };
