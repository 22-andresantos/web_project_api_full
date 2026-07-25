const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau", // Valor padrão caso não seja fornecido
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer", // Valor padrão caso não seja fornecido
  },

  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg", // Valor padrão caso não seja fornecido
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} não é um URL válido!`,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true, // Garante que cada email seja único no banco de dados
    validate: {
      validator(v) {
        return validator.isEmail(v); // Valida se o email é válido usando a biblioteca validator
      },
      message: (props) => `${props.value} não é um email válido!`,
    },
  },

  password: {
    type: String,
    required: true,
    select: false, // Não retorna a senha por padrão em consultas
  },
});

module.exports = mongoose.model("user", userSchema);
