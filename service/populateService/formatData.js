module.exports = function formatData(data) {
  const newData = [];

  data.forEach((currency) => {
    newData.push({
      rank: currency.market_cap_rank,
      name: currency.name,
      currency_id: currency.id,
      symbol: currency.symbol,
      price_change_percentage_1h_in_currency: null,
      current_price: currency.current_price,
      low_24h: currency.low_24h,
      high_24h: currency.high_24h,
      market_cap: currency.market_cap,
      volume: currency.total_volume,
      logo: currency.image,
    });
  });
  //   console.log(newData[0]);
  return newData;
};
