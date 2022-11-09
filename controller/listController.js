const {
  getPageResults,
  checkOutdatedData,
  updateData,
  checkOutdatedPrice,
  updatePrice,
  searchForMatchs,
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
    const outdatedPrice = await checkOutdatedPrice(coinsPriceToUpdate);

    if (outdatedPrice.length < 1) {
      return res.json({ message: "All coins are updated" });
    }

    const newPrices = await updatePrice(outdatedPrice);

    res.json(newPrices);
  } catch (error) {
    res.json(error);
  }
}

async function searchItem(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.json({
        message: "You must inform a coin name, id or symbol...",
      });
    }
    const searchResults = await searchForMatchs(name);

    return res.json(searchResults);
  } catch (error) {
    return console.log(error);
  }

  return res.json(name);
}

module.exports = { list, getPrice, searchItem };
