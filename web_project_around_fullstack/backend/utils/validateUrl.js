const validator = require('validator');

// Função para validar URLs
module.exports = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};
