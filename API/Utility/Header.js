const { APIError } = require("./HTTPError");

function checkHeader(req, res, next) {
    const authToken = req.header("token");

    if (!authToken) {
        res
        .status(401)
        .json(
            new APIError("Authentication header not found.", 401)
            .object({ text: "Provide a 'token' header with the correct value. "})
        );

        return;
    }

    if (authToken != process.env.TOKEN) {
        res
        .status(401)
        .json(
            new APIError("Authentication header 'token' is invalid.", 401)
            .object()
        );

        return;
    }

    next();
}

module.exports = {
    checkHeader
}