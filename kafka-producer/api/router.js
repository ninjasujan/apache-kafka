const express = require("express");
const apiController = require("./controller");

class Api {
    router = express.Router();
    constructor() {
        this.router.post("/publish", apiController.publishKafkaMessage);
    }
}

module.exports = new Api();
