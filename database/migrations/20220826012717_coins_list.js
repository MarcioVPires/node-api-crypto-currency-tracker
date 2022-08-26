exports.up = function (knex) {
  return knex.schema.createTable("coins_list", (table) => {
    table.increment("id");
    table.string("rank");
    table.string("name");
    table.string("currency_id");
    table.string("symbol");
    table.string("current_price");
    table.string("price_change_24h");
    table.string("price_change_1h");
    table.string("market_cap");
    table.string("volume");
    table.string("logo");
  });
};

exports.down = function (knex) {};
