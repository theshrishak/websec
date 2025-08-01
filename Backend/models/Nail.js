const mongoose = require('mongoose');
const { logger } = require('../utils/logger');


const nailSchema = new mongoose.Schema({
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
        default: "Nail"
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

nailSchema.post('save', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'SAVE',
    model: 'NAIL',
    result: res,
    timestamp: new Date().toISOString()
  });
});

nailSchema.post('findByIdAndDelete', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'UPDATE',
    model: 'NAIL',
    result: res,
    timestamp: new Date().toISOString()
  });
});

module.exports = mongoose.model('Nail', nailSchema);