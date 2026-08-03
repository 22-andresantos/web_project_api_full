const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret-key"; // Chave secreta

// get/users retorna todos os usuários
module.exports.getUsers = (req, res, next) => {
  next(new Error("Erro de teste"));
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })

    .then((user) => {
      res.send(user);
    })

    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuário inválido";
      }

      next(err);
    });
};

// get/users/:id retorna um usuário específico
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })

    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuário inválido";
      }

      next(err);
    });
};

// post/users cria um novo usuário
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // Armazena a senha criptografada
      });
    })

    .then((user) => {
      res.status(201).send({
        _id: user._id,

        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados do usuário inválidos";
      }

      if (err.code === 11000) {
        err.statusCode = 409;
        err.message = "Email do usuário já cadastrado";
      }

      next(err);
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password"); // Seleciona a senha para comparação

    if (!user) {
      const err = new Error("Email ou senha incorretos");
      err.statusCode = 401;
      return next(err);
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      const err = new Error("Email ou senha incorretos");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({
      token,
    });
  } catch (err) {
    err.statusCode = 500;
    err.message = "Erro interno do servidor";

    next(err);
  }
};

// patch/users/me atualiza as informações do usuário autenticado
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )

    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })

    .then((user) => {
      res.send(user);
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados do usuário inválidos";
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuário inválido";
      }

      return next(err);
    });
};

// PATCH /users/me/avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )

    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })

    .then((user) => {
      res.send(user);
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "URL do avatar inválida";
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuário inválido";
      }

      return next(err);
    });
};
