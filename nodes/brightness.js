module.exports = function (RED) {
    "use strict";

    function Brightness(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var installationObj = RED.nodes.getNode(config.installation);

        this.on("input", (msg) => {
            var payload = msg.payload;
            if (typeof payload === "number") {
                installationObj.api().setBrightness(
                    Math.min(100, Math.max(0, Math.trunc(payload))))
                    .catch((err) => node.error(err.message, err))
            } else {
                node.error(`Unknown payload type: ${typeof payload}. ${JSON.stringify(payload)}`);
            }
        })
    }

    RED.nodes.registerType("brightness", Brightness);
}