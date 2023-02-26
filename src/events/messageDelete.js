const { logDeletedMessage } = require("../apis/loggerAPI")

module.exports = {
    name: "messageDelete",
    async execute(client, msg) {
        logDeletedMessage(client, msg);
    }
}