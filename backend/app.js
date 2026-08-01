const express = require("express");

const mongoose = require("mongoose");

const app = express();

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { login, createUser } = require("./controllers/users");

const errorHandler = require("./middlewares/errorHandler");

const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./utils/logger");

const auth = require("./middlewares/auth");

// MIDDLEWARE para o POST funcionar lendo o JSON)
app.use(requestLogger);

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3000 } = process.env;

// Rotas publicas
app.post("/signin", login);
app.post("/signup", createUser);

// Middleware de autenticação
app.use(auth);

// Rotas protegidas
app.use("/users", usersRouter);

app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  const err = new Error("Recurso não encontrado");
  err.statusCode = 404;

  next(err);
});

//celebrate
app.use(errors());

//logger de erros
app.use(errorLogger);

//middleware de tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
