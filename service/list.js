const { pageResultsDAO, totalEntriesDao } = require("../dao/list");

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

async function checkForNewerData(req) {
  try {
    const { error, result_amount, startFrom } = await checkPaginationInputs(
      req
    );

    if (error) {
      return error;
    }

    const results = Array.from(await pageResultsDAO(result_amount, startFrom));
    // const toUpdate =
    const test = results[0].updated_at;
    const time = new Date(test);
    //console.log({ before: new Date(test) });
    console.log(new Date(time.getTime()));
    console.log(new Date(time.getTime() - 60 * 60 * 1000));

    // results.forEach((curr) => {
    //   const date = new Date(curr.updated_at);
    //   console.log(date);
    //   console.log(date.getDate());
    // });
    return "foi";
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPageResults, checkForNewerData };
