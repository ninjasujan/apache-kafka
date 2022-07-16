const express = require("express");
const apiController = require("./controller");

class Api {
    router = express.Router();
    constructor() {
        this.router.post("/publish", apiController.publishKafkaMessage);
        this.router.post(
            "/publish-batch",
            apiController.publishKafkaBatchMessage
        );
        this.router.post("/transaction", apiController.publishKafkaTransaction);
    }
}

module.exports = new Api();
