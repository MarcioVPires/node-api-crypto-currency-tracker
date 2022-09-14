const axios = require("../../service/axios");
const formatData = require("../../dev/services/populateService/formatData");
const fs = require("fs");
const max = 53;
const per_page = 250;

// -------------
async function init() {
  console.log("populate initialized...");
  const allCoins = JSON.parse(fs.readFileSync("./coins_list.json"));

  try {
    for (let page = 1; page < max; page++) {
      console.log({ page, per_page });

      const { data } = await axios.get(
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`
      );

      if (data.length) {
        const formatedData = formatData(data);
        const { allCoins_IdList, allCoins_RankList, allCoins_SymbolList } =
          param_List(allCoins);

        const filteredData = removeDuplicate(formatedData, allCoins_IdList);

        addDuplicates(
          filteredData,
          allCoins,
          allCoins_IdList,
          allCoins_RankList,
          allCoins_SymbolList
        );

        console.log({
          same_id: allCoins.same_id.length,
          same_rank: allCoins.same_rank.length,
          same_symbol: allCoins.same_symbol.length,
        });
        allCoins.coins.push(...filteredData);

        const timeOut = (secs) =>
          new Promise((res) => {
            setTimeout(() => res(), secs);
          });
        console.log(`Leaving page index: ${page} ...`);
        await timeOut(3000);
      } else {
        page = max + 1;
      }
    }
  } catch (error) {
    console.log(error);
  }

  fs.writeFileSync("./coins_list.json", JSON.stringify(allCoins));
  console.log("Done!");
}

// -------------

function removeDuplicate(data, allCoins_IdList) {
  const newData = data.filter((data) => {
    return !allCoins_IdList.includes(data.currency_id);
  });
  return newData;
}

function addDuplicates(
  filteredData,
  allCoins,
  allCoins_IdList,
  allCoins_RankList,
  allCoins_SymbolList
) {
  filteredData.forEach((data) => {
    if (allCoins_IdList.includes(data.currency_id)) {
      allCoins.same_id.push(data.currency_id);
    }

    if (allCoins_RankList.includes(data.rank)) {
      data.rank !== null && allCoins.same_rank.push(data.rank);
    }

    if (allCoins_SymbolList.includes(data.symbol)) {
      allCoins.same_symbol.push(data.symbol);
    }
  });
}

function param_List(allCoins) {
  const allCoins_IdList = allCoins.coins.map((coin) => {
    return coin.currency_id;
  });

  const allCoins_RankList = allCoins.coins.map((coin) => {
    return coin.rank;
  });

  const allCoins_SymbolList = allCoins.coins.map((coin) => {
    return coin.symbol;
  });

  return { allCoins_IdList, allCoins_RankList, allCoins_SymbolList };
}

init();
