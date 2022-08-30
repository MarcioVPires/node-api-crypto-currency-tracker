const db = require("../../database/db");
const checkIfAlreadyExists = require("./checkIfAlreadyExists");

async function insertDataCoins(data) {
  try {
    const doExists = await checkIfAlreadyExists(db, data);

    if (doExists.data) {
      return { ...doExists };
    }

    const coinsList = await db("coins_list").insert([...data]);
    return { status: "done" };
  } catch (error) {
    return { status: "error", error };
  }
}

module.exports = { insertDataCoins };
