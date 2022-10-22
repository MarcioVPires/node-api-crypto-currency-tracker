const {
  getPageResults,
  checkOutdatedData,
  updateData,
  checkOutdatedPrice,
} = require("../service/list");

async function list(req, res) {
  try {
    const outDatedData = await checkOutdatedData(req);
    console.log({ controller: outDatedData });
    if (outDatedData.length >= 1) {
      console.log("entrou");
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

async function getPrice(req, res) {
  try {
    const { coinsPriceToUpdate } = req.body;
    const outdatedPrice = checkOutdatedPrice(coinsPriceToUpdate);

    if (outdatedPrice.length < 1) {
      return res.json({ message: "All coins are updated" });
    }

    const updatedPrice = updatePrice(outdatedPrice);

    res.json(updatedPrice);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { list, getPrice };
