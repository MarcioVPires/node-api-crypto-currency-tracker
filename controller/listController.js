const { getPageResults, checkForNewerData } = require("../service/list");

async function list(req, res) {
  try {
    const updateIfNecessary = await checkForNewerData(req);
    // const listResult = await getPageResults(req);
    // if (!listResult) {
    //   res.json("There's no list");
    // }
    // res.json(listResult);
    res.json(updateIfNecessary);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { list };
