module.exports.config = Object.freeze({
    api: "https://squalid-mausoleum-x5r56xrq5476c6vw5-3000.app.github.dev/api"
});

module.exports.makeHeaders = function(data) {
    return { token: process.env.TOKEN, ...data }
}