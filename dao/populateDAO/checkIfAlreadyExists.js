async function checkIfAlreadyExists(db, obj) {
  const existentData = [];

  const checkData = obj.map((curr) => {
    return curr.currency_id;
  });

  //   console.log({ type: "checkData", checkData });

  await Promise.all(
    checkData.map(async (curr) => {
      try {
        const requestedData = await db("coins_list")
          .select("currency_id")
          .where("currency_id", curr);
        // console.log({
        //   type: "requestedData",
        //   requestedData,
        //   condition: requestedData.length > 0,
        // });

        requestedData.length > 0 &&
          existentData.push(requestedData[0].currency_id);
      } catch (error) {
        console.log(error);
      }
    })
  );

  //   console.log({ type: "existentData", existentData });
  return {
    status: "error",
    data: existentData.length > 0 ? true : false,
    existentData,
  };
}

module.exports = checkIfAlreadyExists;
