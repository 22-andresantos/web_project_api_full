const Card = require("../models/card");

// get/cards retorna todos os cartões
module.exports.getCards = (req, res, next) => {
  Card.find({})

    .then((cards) => {
      res.send(cards);
    })

    .catch(next);
};

// post/cards cria um novo cartão
module.exports.createCard = (req, res, next) => {
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
      if (err.name === "ValidationError") {
        const error = new Error("Dados de cartão inválidos");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

// delete/cards/:id exclui um cartão específico com autenticação e autorização
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      const error = new Error("Cartão não encontrado");
      error.statusCode = 404;
      throw error;
    })

    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        const err = new Error(
          "Você não tem permissão para excluir este cartão",
        );
        err.statusCode = 403;
        throw err;
      }

      return card.deleteOne();
    })
    .then(() => {
      res.send({ message: "Cartão excluído com sucesso" });
    })

    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID de cartão inválido");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    {
      $addToSet: {
        likes: req.user._id,
      },
    },

    {
      new: true,
      runValidators: true,
    },
  )

    .orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.statusCode = 404;
      throw err;
    })

    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID de cartão inválido");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    {
      $pull: {
        likes: req.user._id,
      },
    },

    {
      returnDocument: "after",
      runValidators: true,
    },
  )

    .orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.statusCode = 404;
      throw err;
    })

    .then((card) => res.send(card))

    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID de cartão inválido");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};
