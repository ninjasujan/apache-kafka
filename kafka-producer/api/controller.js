const kafkaService = require("../service/kafka.service");
const { KAFKA_TOPIC } = require("../constant/app.constant");

class Api {
    publishKafkaMessage = async (req, res, next) => {
        const { stream, message } = req.body;
        await kafkaService.produceMessage(KAFKA_TOPIC, [
            {
                key: Math.random().toString(),
                value: JSON.stringify({ stream, message }),
            },
        ]);
        res.status(200).json({ message: "message pushed to kafka" });
    };
}

module.exports = new Api();
