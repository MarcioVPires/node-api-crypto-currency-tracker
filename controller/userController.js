const { getUserDAO, signupUserDAO } = require("../dao/user");
const securePassword = require("secure-password");
const pwd = securePassword();

async function signup(req, res) {
  const { name, email, password, passwordConfirmation } = req.body;
  if (!name || !email || !password || !passwordConfirmation) {
    return res.json({ error: "Todos os campos precisam ser preenchidos" });
  }

  if (password.length < 4 || passwordConfirmation.length < 4) {
    return res.json({ error: "As senhas precisam de no mínimo 4 caracteres" });
  }

  if (password !== passwordConfirmation) {
    return res.json({
      error:
        "As senhas não correspondem. Por favor confira se estão iguais e tente outra vez",
    });
  }

  try {
    const checkUser = await getUserDAO(email);

    if (checkUser.length > 0) {
      console.log(`Usuário ${checkUser[0].name} já existe...`);
      return res.json({ message: "Esse usuário já existe" });
    }

    const passwordHash = (await pwd.hash(Buffer.from(password))).toString(
      "hex"
    );

    const saveUser = await signupUserDAO({
      name,
      email,
      passwordHash,
    });

    if (saveUser.length <= 0) {
      return res.status("501").json({ message: "Algo deu errado" });
    }

    console.log({ saveUser });
    return res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
  }

  return res.json({ name, email, password, passwordConfirmation });
}

module.exports = { signup };
