const mongoose = require('mongoose');
const { logger } = require('../utils/logger');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
    },
    passwordSetDate: {
        // For Password Change Option
        type: Date,
        default: Date.now,
        select: false
    },
    joinedDate: {
        type: Date,
        default: Date.now,
        select: false
    },
    fullname: {
        type: String,
        default: "",
        get: capitalize
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    profile: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'hidden'],
        default: "hidden"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    bio: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    resetCode: {
        type: String,
        default: null,
        select: false
    },
    resetCodeExpiration: {
        type: Date,
        default: null,
        select: false
    },
    passwordSetDate: {
        // For Password Change Option
        type: Date,
        default: Date.now,
        select: false
    },
    searchHistory: [String],
});

userSchema.post('save', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'SAVE',
    model: 'USER',
    result: res,
    timestamp: new Date().toISOString()
  });
});

userSchema.post('updateOne', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'UPDATE',
    model: 'USER',
    result: res,
    timestamp: new Date().toISOString()
  });
});

function capitalize(name){
    return name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

module.exports = mongoose.model("User", userSchema);