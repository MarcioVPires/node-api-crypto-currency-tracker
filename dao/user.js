const db = require("../database/db");

async function getUserDAO(email) {
  const user = await db("users").select("*").where({ email });

  return user;
}

async function signupUserDAO(userData) {
  const user = await db("users").insert(userData);

  return user;
}

module.exports = { getUserDAO, signupUserDAO };
