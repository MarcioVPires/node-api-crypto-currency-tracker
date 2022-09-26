const { pageResultsDAO, totalEntriesDao } = require("../dao/list");

async function getPageResults(req) {
  try {
    const total_entries = await totalEntriesDao();
    const page = Number(req.params.page);
    const result_amount = Number(req.params.result_amount);
    const startFrom =
      page * result_amount === result_amount
        ? 0
        : page * result_amount - result_amount;

    if (page > total_entries / result_amount || page < 1) {
      return { mensagem: "Essa página não existe" };
    }

    //return pagination;
    return pageResultsDAO(result_amount, startFrom);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPageResults };
