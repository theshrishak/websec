module.exports.randomOtpGenerator= (min, max) => {
    return Math.floor(Math.random()*(max-min)) + min
}

