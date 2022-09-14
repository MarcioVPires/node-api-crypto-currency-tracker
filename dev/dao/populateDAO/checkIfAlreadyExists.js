const db = require("../../../database/db");

async function checkIfAlreadyExists(obj) {
  const existentData = [];

  const idsToCheck = obj.map((curr) => {
    return curr.currency_id;
  });

  // const checkData = new Promise((res, rej) => {

  // })

  // console.log({ type: "idsToCheck", idsToCheck });

  await Promise.all(
    idsToCheck.map(async (curr) => {
      try {
        const requestedData = await db("coins_list")
          .select("currency_id")
          .where("currency_id", curr);

        requestedData.length > 0 &&
          existentData.push(requestedData[0].currency_id);
      } catch (error) {
        console.log(error);
      }
    })
  );

  return {
    status: "error",
    data: existentData.length > 0 ? true : false,
    existentData,
  };
}

module.exports = checkIfAlreadyExists;
