const router = require('express').Router();

const {
  fetchAllThoughts,
  fetchThoughtById,
  createNewThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  removeReaction,
} = require('../../config/controllers/appController');

router.route('/')
  .get(fetchAllThoughts)
  .post(createNewThought);

router.route('/:customThoughtId')
  .get(fetchThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router.route('/:customThoughtId/reactions')
  .post(addReaction);

router.route('/:customThoughtId/reactions/:customReactionId')
  .delete(removeReaction);

module.exports = router;
