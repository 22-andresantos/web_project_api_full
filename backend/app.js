const express = require('express');

const mongoose = require('mongoose');

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// MIDDLEWARE para o POST funcionar lendo o JSON)
app.use(express.json());

// Simulando um usuário autenticado
app.use((req, res, next) => {
  req.user = {
    _id: '6a078c781439d74e9b70cb40', // ID fictício do usuário
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;

// conectando as rotas modulares
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  // Aspas: Deve-se usar sempre 'aspas simples', nunca "duplas", a menos que seja necessário.
  res.status(404).send({
    message: 'A solicitação não foi encontrada',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
