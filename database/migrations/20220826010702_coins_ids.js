exports.up = function (knex) {
  return knex.schema.createTable("coins_ids", (table) => {
    table.increments("id");
    table.string("name");
    table.string("currency_id");
    table.string("symbol");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("coins_ids");
};
