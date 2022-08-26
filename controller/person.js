const PersonService = require("../service/person");

async function person(req, res) {
  try {
    const id = await PersonService(req.body);
    res.status(201).json(id);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { person };
