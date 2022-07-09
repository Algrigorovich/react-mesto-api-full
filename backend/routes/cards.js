const router = require('express').Router();
const { cardValidator, paramsValidator } = require('../middlewares/joi-schemas');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', paramsValidator, deleteCard);
router.post('/', cardValidator, createCard);
router.put('/:cardId/likes', paramsValidator, likeCard);
router.delete('/:cardId/likes', paramsValidator, dislikeCard);

module.exports = router;
