const db = require("../database/db");

async function getWatchListDAO(id) {
  const list = await db("users").select("watchlist").where({ id });

  return list;
}

async function setWatchListDAO({ id, newList }) {
  const list = await db("users").update({ watchlist: newList }).where({ id });

  return list;
}

module.exports = { getWatchListDAO, setWatchListDAO };
