require("dotenv").config();

class Locals {
    static SERVER_PORT = process.env.SERVER_PORT;
    static KAFKA_SERVER = process.env.KAFKA_SERVER;
}

module.exports = Locals;
