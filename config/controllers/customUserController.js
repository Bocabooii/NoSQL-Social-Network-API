const { UserModel } = require('../../models/Users');

const UserController = {
  // Get all users
  fetchAllUsers(req, res) {
    UserModel.find({})
      .then(users => res.json(users))
      .catch(error => res.status(500).json(error));
  },

  // Get a user by ID
  fetchUserById(req, res) {
    UserModel.findById(req.params.userId)
      .then(user => res.json(user))
      .catch(error => res.status(500).json(error));
  },
  
  // Create a new user
  createUser(req, res) {
    UserModel.create(req.body)
      .then(newUser => res.json(newUser))
      .catch(error => res.status(500).json(error));
  },

  // Update a user by ID
  updateUserById(req, res) {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      })
      .catch(error => res.status(500).json(error));
  },

  // Delete a user by ID
  deleteUserById(req, res) {
    UserModel.findOneAndDelete({ _id: req.params.id })
      .then(deletedUser => {
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      })
      .catch(error => res.status(500).json(error));
  },

  // Add a friend to the user's friend list
  addFriend(req, res) {
    UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId } },
      { new: true }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      })
      .catch(error => res.status(500).json(error));
  },

  // Remove a friend from the user's friend list
  removeFriend(req, res) {
    UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        const isFriendRemoved = !updatedUser.friends.includes(req.params.friendId);
        if (isFriendRemoved) {
          res.json({ message: 'Friend removed successfully!', updatedUser });
        } else {
          res.json(updatedUser);
        }
      })
      .catch(error => res.status(400).json(error));
  },
};

module.exports = UserController;
