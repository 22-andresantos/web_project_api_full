const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret-key"; // Chave secreta

// get/users retorna todos os usuários
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })

    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Usuário não encontrado",
        });
      }
      return res.send(user);
    })

    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
      }

      next(err);

      return res.status(500).send({
        message: "Erro interno do servidor",
      });
    });
};

// get/users/:id retorna um usuário específico
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Usuário não encontrado",
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
      }

      next(err);
    });
};

// post/users cria um novo usuário
module.exports.createUser = (req, res) => {
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
      }

      next(err);

      if (err.code === 11000) {
        return res.status(409).send({
          message: "Email já cadastrado",
        });
      }

      return res.status(500).send({
        message: "Erro ao criar usuário",
      });
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password"); // Seleciona a senha para comparação

    if (!user) {
      return res.status(401).send({
        message: "Email ou senha incorretos",
      });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).send({
        message: "Email ou senha incorretos",
      });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({
      token,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Erro interno do servidor",
    });
  }
};

// patch/users/me atualiza as informações do usuário autenticado
module.exports.updateProfile = (req, res) => {
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
      }

      next(err);

      if (err.name === "CastError") {
        err.statusCode = 400;
      }

      next(err);

      if (err.statusCode === 404) {
        return res.status(404).send({
          message: err.message,
        });
      }

      return res.status(500).send({
        message: "Erro interno",
      });
    });
};

// PATCH /users/me/avatar
module.exports.updateAvatar = (req, res) => {
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
        return res.status(400).send({
          message: "Dados inválidos",
        });
      }

      return res.status(500).send({
        message: "Erro interno",
      });
    });
};
