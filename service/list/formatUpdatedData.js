function formatUpdatedData(data) {
  const formatedData = data.map((curr) => {
    return {
      currency_id: curr.id,
      price_change_percentage_1h_in_currency:
        curr.price_change_percentage_1h_in_currency,
      current_price: curr.current_price,
      low_24h: curr.low_24h,
      high_24h: curr.high_24h,
      volume: curr.total_volume,
      market_cap: curr.market_cap,
    };
  });

  return formatedData;
}

module.exports = { formatUpdatedData };
