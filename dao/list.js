const db = require("../database/db");

async function totalEntriesDao() {
  const [{ count: total_entries }] = await db("coins_list").select().count("*");

  return Number(total_entries);
}

async function pageResultsDAO(result_amount, startFrom) {
  console.log();
  const page_results = await db("coins_list")
    .select("*")
    .limit(result_amount)
    .offset(startFrom);

  return page_results;
}

module.exports = { pageResultsDAO, totalEntriesDao };
