const { logEditedMessage } = require("../apis/loggerAPI")

module.exports = {
    name: "messageUpdate",
    async execute(client, oldMsg, newMsg) {
        logEditedMessage(client, oldMsg, newMsg);
    }
}