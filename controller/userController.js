const {
  getUserDAO,
  signupUserDAO,
  updateUserPassword,
} = require("../dao/user");
const securePassword = require("secure-password");
const pwd = securePassword();
const jwt = require("jsonwebtoken");

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
      password: passwordHash,
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

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Todos os campos precisam ser preenchidos" });
  }

  const user = await getUserDAO(email);

  if (user.length <= 0) {
    return res.json({ message: "O usuário não existe" });
  }

  const verifyPassword = await pwd.verify(
    Buffer.from(password),
    Buffer.from(user[0].password, "hex")
  );

  console.log(verifyPassword);

  switch (verifyPassword) {
    case securePassword.INVALID_UNRECOGNIZED_HASH:
    case securePassword.INVALID:
      return res.json({ message: "Email ou senha Incorretos" });
    case securePassword.VALID:
      break;
    case securePassword.VALID_NEEDS_REHASH:
      try {
        const newHash = (await pwd.hash(Buffer.from(password))).toString("hex");
        const updatePassword = await updateUserPassword({
          email,
          password: newHash,
        });

        console.log(updatePassword);
      } catch (error) {
        console.log(error);
      }
  }

  const token = jwt.sign(
    {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    },
    process.env.USER_TOKEN,
    {
      expiresIn: "1h",
    }
  );

  return res.json({ token });
}

module.exports = { signup, login };
