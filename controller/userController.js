function signup(req, res) {
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

  return res.json({ name, email, password, passwordConfirmation });
}

module.exports = { signup };
