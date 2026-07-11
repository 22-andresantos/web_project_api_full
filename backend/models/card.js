const mongoose = require('mongoose');

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+#?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} não é um URL de imagem válido!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Diz ao Mongoose que esse ID pertence a um usuário
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Array contendo IDs de usuários que curtiram
      },
    ],
    default: [], // Começa vazio por padrão
  },
  createdAt: {
    type: Date,
    default: Date.now, // Insere a data/hora atual no momento da criação
  },
});

module.exports = mongoose.model('card', cardSchema);
