const User = require('../models/user');

// get/users retorna todos os usuários
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })

    .catch(() => {
      res.status(500).send({
        message: 'Erro ao buscar usuários',
      });
    });
};

// get/users/:id retorna um usuário específico
module.exports.getUserById = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Usuário não encontrado',
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de usuário inválido',
        });
      }
      return res.status(500).send({
        message: 'Erro ao buscar usuário',
      });
    });
};

// post/users cria um novo usuário
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Dados de usuário inválidos',
        });
      }
      return res.status(500).send({
        message: 'Erro ao criar usuário',
      });
    });
};

// patch/users/me atualiza as informações do usuário autenticado
module.exports.updateUser = (req, res) => {
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
      const err = new Error('Usuário não encontrado');
      err.statusCode = 404;
      throw err;
    })

    .then((user) => {
      res.send(user);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Dados inválidos',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID inválido',
        });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({
          message: err.message,
        });
      }

      return res.status(500).send({
        message: 'Erro interno',
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
      const err = new Error('Usuário não encontrado');
      err.statusCode = 404;
      throw err;
    })

    .then((user) => {
      res.send(user);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Dados inválidos',
        });
      }

      return res.status(500).send({
        message: 'Erro interno',
      });
    });
};
