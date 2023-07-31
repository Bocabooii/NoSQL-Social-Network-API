const { Schema, model } = require('mongoose');
const customReactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        creatorUsername: {
            type: String,
            required: true,
        },
        reactions: [customReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

const ThoughtModel = model('Thought', thoughtSchema);

module.exports = ThoughtModel;
