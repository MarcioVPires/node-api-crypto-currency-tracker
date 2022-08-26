const db = require("../database/db");

async function personDAO(firstName, lastName, email) {
  const [id] = await db("person")
    .insert({
      email,
      first_name: firstName,
      last_name: lastName,
    })
    .returning("id");

  return id;
}

module.exports = personDAO;
