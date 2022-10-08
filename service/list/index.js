const { pageResultsDAO, totalEntriesDao } = require("../../dao/list");
const { formatUpdatedData } = require("./formatUpdatedData");
const axios = require("../axios");

async function checkPaginationInputs(req) {
  const total_entries = await totalEntriesDao();
  const page = Number(req.params.page);
  const result_amount = Number(req.params.result_amount);

  const startFrom =
    page * result_amount === result_amount
      ? 0
      : page * result_amount - result_amount;

  if (page > total_entries / result_amount || page < 1) {
    return { error: "Essa página não existe" };
  }

  return { result_amount, startFrom };
}

async function getPageResults(req) {
  try {
    const { error, result_amount, startFrom } = await checkPaginationInputs(
      req
    );

    if (error) {
      return error;
    }

    return pageResultsDAO(result_amount, startFrom);
  } catch (error) {
    console.log(error);
  }
}

async function checkOutdatedData(req) {
  try {
    const { error, result_amount, startFrom } = await checkPaginationInputs(
      req
    );

    if (error) {
      return error;
    }

    const results = Array.from(await pageResultsDAO(result_amount, startFrom));

    const hourToMs = (hour) => hour * 60 * 60 * 1000;
    const timeStamp = (date) => (date ? new Date(date).getTime() : Date.now());

    const outdatedData = results.map((curr) => {
      const {
        updated_at: last,
        last_24h_change_update: daily,
        last_hour_change_update: hourly,
      } = curr;

      const data = {
        update: false,
        currency_id: curr.currency_id,
        name: curr.name,
      };

      if (timeStamp(daily) + hourToMs(24) < timeStamp()) {
        data.update = true;
        data.daily = true;
      }

      if (timeStamp(hourly) + hourToMs(1) < timeStamp()) {
        data.update = true;
        data.hourly = true;
      }

      return data.update && data;
    });

    return outdatedData;
  } catch (error) {
    console.log(error);
  }
}

async function updateData(outdatedData) {
  const params = outdatedData.map((curr) => curr.currency_id).join("%2C");

  const { data } = await axios.get(
    `/coins/markets?vs_currency=usd&ids=${params}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h'`
  );

  const newData = formatUpdatedData(data, outdatedData);

  console.log(data);
}

module.exports = { getPageResults, checkOutdatedData, updateData };