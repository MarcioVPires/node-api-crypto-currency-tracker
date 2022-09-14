const populateDAO = require("../../dao/populateDAO");
const axios = require("../../../service/axios");
const formatData = require("./formatData");

async function coinsByRank(data) {
  try {
    const { per_page = undefined, page = 1 } = data;
    const pagination = {
      per_page,
      page,
    };

    if (!per_page || per_page < 10) {
      pagination.per_page = 10;
    } else if (per_page > 250) {
      pagination.per_page = 250;
    }
    console.log({ onserver: true, pagination });
    const query = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`;
    const { data: response } = await axios.get(query);

    if (response.length === 0) {
      return { next_page: false, message: "This page doesn't exists" };
    }

    return populateDAO.insertDataCoins(formatData(response));
  } catch (error) {
    return error;
  }
}

module.exports = { coinsByRank };
