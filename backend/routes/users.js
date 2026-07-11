const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    return res.status(200).send(JSON.parse(data));
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'A solicitação não foi encontrada' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find((u) => String(u._id) === id);

    if (!user) {
      return res.status(404).send({ message: 'Id do usuário não encontrado' });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res
      .status(404)
      .send({ message: 'A solicitação não foi encontrada' });
  }
});

module.exports = router;
