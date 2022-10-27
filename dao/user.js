const db = require("../database/db");

async function getUserDAO(email) {
  const user = await db("users").select("*").where({ email });

  return user;
}

async function signupUserDAO(userData) {
  const user = await db("users").insert(userData);

  return user;
}

async function updateUserPassword({ email, password }) {
  const user = await db("users").update({ password }).where({ email });

  return user;
}

async function updateUserEmail({ newEmail, oldEmail }) {
  const user = await db("users")
    .update({ email: newEmail })
    .where({ email: oldEmail });

  return user;
}

module.exports = {
  getUserDAO,
  signupUserDAO,
  updateUserPassword,
  updateUserEmail,
};
