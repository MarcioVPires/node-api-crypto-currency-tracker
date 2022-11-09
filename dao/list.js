const db = require("../database/db");

async function totalEntriesDao() {
  const [{ count: total_entries }] = await db("coins_list").select().count("*");

  return Number(total_entries);
}

async function pageResultsDAO(result_amount, startFrom) {
  const page_results = await db("coins_list")
    .select("*")
    .orderBy("id", "asc")
    .limit(result_amount)
    .offset(startFrom);

  return page_results;
}

async function priceUpdateDAO({ currency_id, current_price, updated_at }) {
  const priceUpdate = await db("coins_list")
    .where({ currency_id })
    .update({ current_price, updated_at });
}

async function hourlyDataUpdateDao({
  currency_id,
  price_change_percentage_1h_in_currency,
  last_hour_change_update,
}) {
  const lastHourPricePercentage = await db("coins_list")
    .where({ currency_id })
    .update({
      price_change_percentage_1h_in_currency,
      last_hour_change_update,
    });
}

async function dailyDataUpdateDao(newData) {
  const update = await db("coins_list")
    .where({
      currency_id: newData.currency_id,
    })
    .update({ ...newData });
}

async function getPriceDao(coins) {
  const prices = await Promise.all(
    coins.map(async (curr) => {
      const coin = await db("coins_list")
        .select("currency_id", "updated_at")
        .where(curr);
      return coin[0];
    })
  );

  return prices;
}

async function getCoinById(currency_id) {
  console.log(currency_id);
  const coin = await db("coins_list")
    .select("*")
    .whereIn("currency_id", currency_id);

  return coin;
}

async function searchItemDAO(name) {
  const results = await db("coins_list")
    .select("*")
    .where("currency_id", "ilike", `${name}%`)
    .orWhere("name", "ilike", `${name}%`)
    .orWhere("symbol", "ilike", `${name}%`)
    .orderBy("rank", "asc");

  return results;
}

module.exports = {
  pageResultsDAO,
  totalEntriesDao,
  priceUpdateDAO,
  hourlyDataUpdateDao,
  dailyDataUpdateDao,
  getPriceDao,
  getCoinById,
  searchItemDAO,
};
