const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    }
});

UserSchema.index({ location: '2dsphere' });

module.exports = model('User', UserSchema);