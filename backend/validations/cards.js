const validatorUrl = require("../utils/validateUrl");

const { celebrate, Joi } = require("celebrate");

// validação de criação de card
module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),

    link: Joi.string().required().custom(validatorUrl),
  }),
});

// validação de id do card
module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});
