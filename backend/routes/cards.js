const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, 'utf-8');
    res.status(200).send(JSON.parse(data));
  } catch (error) {
    res.status(500).send({ message: 'Erro ao ler o arquivo de cards' });
  }
});
module.exports = router;
