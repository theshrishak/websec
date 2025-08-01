const mongoose = require('mongoose');
const { logger } = require('../utils/logger');


const makeupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true,
    },
    description: {
        type: [String],
        required: true
    },
    image: {
        type: String,
    },
    serviceType: {
        type: String,
        default: "Makeup"
    },
    createdDate: {  
        type: Date,
        default: Date.now
    },
    hashtag:[String],
    avgRating: {
        type: Number,
        default: 0
    }
});

makeupSchema.post('save', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'SAVE',
    model: 'MAKEUP',
    result: res,
    timestamp: new Date().toISOString()
  });
});

makeupSchema.post('findByIdAndDelete', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'UPDATE',
    model: 'MAKEUP',
    result: res,
    timestamp: new Date().toISOString()
  });
});

module.exports = mongoose.model('Makeup', makeupSchema);