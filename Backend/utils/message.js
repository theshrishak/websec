exports.success = function (message="Successful", data={}) {
    return {
        message: message,
        data: data,
        success: true
    };
};

exports.failure = function (message="Something went Wrong") {
    return {
        message: message,
        success: false
    };
}