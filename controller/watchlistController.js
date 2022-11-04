const { getWatchListDAO, setWatchListDAO } = require("../dao/watchlist");
const { formatNewList } = require("../service/watchlist");
const { getCoinById } = require("../dao/list");

async function getWatchList(req, res) {
  return res.json("Watch list");
}

async function setWatchList(req, res) {
  const { coin_id } = req.body;
  const { id } = req.user;

  if (!coin_id) {
    return res.json({ message: "The coin ID missing..." });
  }

  if (!id) {
    return res.json({ message: "User must me logged in..." });
  }

  try {
    const coinExists = await getCoinById(coin_id);

    if (coinExists.length <= 0) {
      return res.json({ message: "The coin ID informed doesn't exist..." });
    }

    const [{ watchlist }] = await getWatchListDAO(id);

    const newList = formatNewList(watchlist, coin_id);

    const addToWatchList = await setWatchListDAO({ id, newList });

    return res.json(addToWatchList);
  } catch (error) {}
}

module.exports = { getWatchList, setWatchList };
