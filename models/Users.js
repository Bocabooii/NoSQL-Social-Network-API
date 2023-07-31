const { Schema, model } = require('mongoose');

const customUserSchema = new Schema(
    {
        customUsername: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        customEmail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address.'],
        },
        customThoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', 
            },
        ],
        customFriends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

customUserSchema.virtual('friendCount').get(function () {
    return this.customFriends.length;
});

const UserModel = model('CustomUser', customUserSchema);

module.exports = UserModel;
