const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {failure} =  require('../utils/message');
const { logger } = require('../utils/logger');

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader.split(' ')[1];
        if(accessToken==null) return res.status(401).json(failure("Access Denied"));
        const authUser = jwt.verify(accessToken, process.env.TOKEN_KEY);
        const issueAt= new Date(authUser.iat*1000);
        const user = await User.findById(authUser._id).select('+passwordSetDate');
        const passwordSetDate = new Date(user.passwordSetDate);
        if(user && issueAt>=passwordSetDate){
            req.user = user;
            next();
        } else {
            return res.status(401).json(failure("Access Denied"));
        }
    } catch (error) {
        logger.info(error);
        return res.status(401).json(failure("Access Denied"));
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader.split(' ')[1];
        if(accessToken==null) return res.status(401).json(failure("Access Denied"));
        const authUser = jwt.verify(accessToken, process.env.TOKEN_KEY);
        const issueAt= new Date(authUser.iat*1000);
        const user = await User.findById(authUser._id).select('+passwordSetDate');
        logger.info(user);
        if(!user || user?.role !== 'admin') return res.status(401).json(failure("Access Denied"));
        const passwordSetDate = new Date(user.passwordSetDate);
        if(user && issueAt>=passwordSetDate){
            req.user = user;
            next();
        } else {
            return res.status(401).json(failure("Access Denied"));
        }
    } catch (error) {
        logger.info(error);
        return res.status(401).json(failure("Access Denied"));
    }
};

module.exports = { isAdmin, verifyUser};