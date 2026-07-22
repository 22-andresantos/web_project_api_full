const express = require("express");
const mongoose = require("mongoose");

const { login, createUser } = require("./controllers/users"); // Controllers

const auth = require("./middlewares/auth"); // Middleware de autenticação

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express(); // Criando uma instância do aplicativo Express

const { PORT = 3000 } = process.env;

// Conectando ao banco de dados MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb");

// MIDDLEWARE para o POST funcionar lendo o JSON)
app.use(express.json());

// conectando as rotas publicas
app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth); // middleware para rotas protegidas

// conectando as rotas protegidas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "A solicitação não foi encontrada",
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
