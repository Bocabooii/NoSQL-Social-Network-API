const { ThoughtModel} = require('../models');
const { Types } = require('mongoose');

// Define the ThoughtController object, which contains methods for handling various API requests related to thoughts
const ThoughtController = {
  // Handler for the "get all thoughts" API endpoint
  async fetchAllThoughts(req, res) {
    try {
      const thoughts = await ThoughtModel.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "get thought by ID" API endpoint
  async fetchThoughtById(req, res) {
    try {
      const thought = await ThoughtModel.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "create thought" API endpoint
  async createNewThought(req, res) {
    try {
      const thought = await ThoughtModel.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "delete thought" API endpoint
  async deleteThoughtById(req, res) {
    try {
      const thought = await ThoughtModel.findByIdAndDelete({ _id: req.params.thoughtId });
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "update thought by ID" API endpoint
  async updateThoughtById(req, res) {
    try {
      const thought = await ThoughtModel.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "create reaction" API endpoint
  async addReaction(req, res) {
    try {
      const thought = await ThoughtModel.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: 'Not found' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "delete reaction" API endpoint
  async removeReaction(req, res) {
    try {
      const thought = await ThoughtModel.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought ? res.json(thought) : res.status(404).json({ message: 'Not found' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// Export ThoughtController
module.exports = ThoughtController;
