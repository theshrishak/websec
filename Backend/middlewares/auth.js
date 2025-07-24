const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {failure} =  require('../utils/message');

module.exports.verifyUser = async (req, res, next) => {
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
            // password changed after token issued
            return res.status(401).json(failure("Access Denied"));
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json(failure("Access Denied"));
    }
};
