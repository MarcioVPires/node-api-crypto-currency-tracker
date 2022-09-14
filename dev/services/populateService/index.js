const populateDAO = require("../../dao/populateDAO");
const fs = require("fs");

async function coinsByRank() {
  try {
    const content = JSON.parse(fs.readFileSync("./coins_list.json", "utf-8"));
    const response = { status: "", data: [] };
    const coins = [
      [...new Set(content.coins.filter((coin) => coin.rank !== null))],
      [...new Set(content.coins.filter((coin) => coin.rank === null))],
    ];
    //const coins = content.coins.filter((coin) => coin.rank === null);
    if (coins.length <= 0) {
      return { message: "You need to init the populate process first" };
    }

    coins.forEach(async (coinsArray) => {
      const dataReturn = await populateDAO.insertDataCoins(coinsArray);
      response.status = dataReturn.status;
      response.data.push(dataReturn.data);
    });

    console.log("Finnish");
    return response;
    // return populateDAO.insertDataCoins(coins[0]);
  } catch (error) {
    return error;
  }
}

module.exports = { coinsByRank };
