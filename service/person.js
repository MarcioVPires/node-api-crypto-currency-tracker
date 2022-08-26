const personDAO = require("../dao/person");

function PersonService(personData) {
  const { first_name, last_name, email } = personData;
  return personDAO(first_name, last_name, email);
}

module.exports = PersonService;
