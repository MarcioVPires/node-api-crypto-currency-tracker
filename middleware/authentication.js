const jwt = require("jsonwebtoken");
const { getUserDAO } = require("../dao/user");

async function authenticationFilter(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const token = await jwt.verify(
      authorization.replace("Bearer", "").trim(),
      process.env.USER_TOKEN
    );

    const user = await getUserDAO(token.email);

    if (user.length <= 0) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    req.user = user[0];
    console.log(`${user[0].name} Passou pelo middleware`);

    next();
  } catch (error) {
    return res.status(500).json({ message: `Erro interno: ${error.message}` });
  }
}

module.exports = { authenticationFilter };
