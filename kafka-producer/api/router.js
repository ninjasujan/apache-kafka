const express = require("express");
const apiController = require("./controller");

class Api {
    router = express.Router();
    constructor() {
        this.router.post("/publish", apiController.publishKafkaMessage);
        this.router.post("/batch", apiController.publishKafkaBatchMessage);
    }
}

module.exports = new Api();
