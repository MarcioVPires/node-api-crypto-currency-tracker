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

async function priceUpdateDAO() {}

async function hourlyDataUpdateDao() {}

async function dailyDataUpdateDao(newData) {
  const update = await db("coins_list")
    .where({
      currency_id: newData.currency_id,
    })
    .update({ ...newData });

  console.log(update);

  //console.log(newData);
}

module.exports = {
  pageResultsDAO,
  totalEntriesDao,
  priceUpdateDAO,
  hourlyDataUpdateDao,
  dailyDataUpdateDao,
};
