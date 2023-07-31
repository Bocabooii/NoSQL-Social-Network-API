const router = require('express').Router();

const {
  fetchAllUsers,
  fetchUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../../config/controllers/customUserController');

router.route('/').get(fetchAllUsers).post(createUser);

router.route('/:customUserId').get(fetchUserById).put(updateUserById).delete(deleteUserById);

router.route('/:customUserId/friends/:customFriendId').post(addFriend).delete(removeFriend);

module.exports = router;
