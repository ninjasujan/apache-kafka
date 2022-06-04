const kafkaService = require("../service/kafka.service");
const { KAFKA_TOPIC } = require("../constant/app.constant");

class Api {
    testController = async (req, res, next) => {
        res.status(200).end();
    };
}

module.exports = new Api();
