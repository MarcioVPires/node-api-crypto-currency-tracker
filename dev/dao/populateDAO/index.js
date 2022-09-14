const db = require("../../../database/db");
const checkIfAlreadyExists = require("./checkIfAlreadyExists");

async function insertDataCoins(data) {
  try {
    console.log("database call...");
    const doExists = await checkIfAlreadyExists(data);

    if (doExists.data) {
      console.log({ where: "DAO", doExists });
      return { ...doExists };
    }

    const coinsList = await db("coins_list").insert([...data]);
    return { status: "done", data };
  } catch (error) {
    console.log(error);
    return { status: "error", error };
  }
}

module.exports = { insertDataCoins };
