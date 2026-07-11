const Card = require('../models/card');

// get/cards retorna todos os cartões
module.exports.getCards = (req, res) => {
  Card.find({})

    .then((cards) => {
      res.status(200).send(cards);
    })

    .catch(() => {
      res.status(500).send({
        message: 'Erro interno do servidor',
      });
    });
};

// post/cards cria um novo cartão
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id, // O ID do usuário autenticado é definido como o proprietário do cartão
  })

    .then((card) => {
      res.status(201).send(card);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Dados de cartão inválidos',
        });
      }

      return res.status(500).send({
        message: 'Erro interno do servidor',
      });
    });
};

// delete/cards/:id exclui um cartão específico
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.statusCode = 404;
      throw error;
    })

    .then(() => {
      res.send({
        message: 'Cartão excluído com sucesso',
      });
    })

    .catch((err) => {
      // erro customizado
      if (err.statusCode === 404) {
        return res.status(404).send({
          message: err.message,
        });
      }

      // ID inválido
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de cartão inválido',
        });
      }

      // erro padrão
      return res.status(500).send({
        message: 'Erro interno do servidor',
      });
    });
};

// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    {
      $addToSet: {
        likes: req.user._id,
      },
    },

    {
      new: true,
    },
  )

    .orFail(() => {
      const err = new Error('Cartão não encontrado');
      err.statusCode = 404;
      throw err;
    })

    .then((card) => {
      res.send(card);
    })

    .catch((err) => {
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

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    {
      $pull: {
        likes: req.user._id,
      },
    },

    {
      new: true,
    },
  )

    .orFail(() => {
      const err = new Error('Cartão não encontrado');
      err.statusCode = 404;
      throw err;
    })

    .then((card) => {
      res.send(card);
    })

    .catch((err) => {
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
