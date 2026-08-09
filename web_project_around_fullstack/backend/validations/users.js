const { celebrate, Joi } = require('celebrate');
const validatorUrl = require('../utils/validateUrl');

// criação de usuário
module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),

    about: Joi.string().min(2).max(30),

    avatar: Joi.string().custom(validatorUrl),

    email: Joi.string().required().email(),

    password: Joi.string().required(),
  }),
});

// validação de id do usuário
module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

// login de usuário
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),

    password: Joi.string().required(),
  }),
});

// atualização de usuário
module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),

    about: Joi.string().required().min(2).max(30),
  }),
});

// atualização de avatar
module.exports.validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validatorUrl),
  }),
});
