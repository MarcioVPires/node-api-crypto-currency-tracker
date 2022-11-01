exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.text("password").notNullable();
    table.specificType("watchlist", "TEXT[]").defaultTo("{}");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
