const { getWatchListDAO, setWatchListDAO } = require("../dao/watchlist");
const { formatNewList } = require("../service/watchlist");

async function getWatchList(req, res) {
  return res.json("Watch list");
}

async function setWatchList(req, res) {
  const { watch } = req.body;
  const { id } = req.user;

  if (!watch) {
    return res.json({ message: "The coin ID missing..." });
  }

  if (!id) {
    return res.json({ message: "User must me logged in..." });
  }

  try {
    const [{ watchlist }] = await getWatchListDAO(id);

    const newList = formatNewList(watchlist, watch);

    const addToWatchList = await setWatchListDAO({ id, newList });

    return res.json(addToWatchList);
  } catch (error) {}
}

module.exports = { getWatchList, setWatchList };
