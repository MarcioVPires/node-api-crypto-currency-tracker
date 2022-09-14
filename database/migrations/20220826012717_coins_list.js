exports.up = function (knex) {
  return knex.schema.createTable("coins_list", (table) => {
    table.increments("id");
    table.integer("rank").unique();
    table.string("name").unique();
    table.string("currency_id").unique();
    table.string("symbol");
    table.decimal("price_change_percentage_1h_in_currency", null);
    table.decimal("current_price", null, 10);
    table.decimal("low_24h", null, 10);
    table.decimal("high_24h", null, 10);
    table.decimal("volume", null, null);
    table.decimal("market_cap", null, null);
    table.text("logo");
    table.timestamps(true, true);
    table.timestamp("last_24h_change_update").defaultTo(knex.fn.now());
    table.timestamp("last_hour_change_update").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("coins_list");
};
