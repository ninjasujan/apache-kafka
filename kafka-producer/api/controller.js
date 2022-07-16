const kafkaService = require("../service/kafka.service");
const {
    KAFKA_TOPIC,
    KAFKA_BATCH_TOPIC,
    KAFKA_TRANSACTION_TOPIC,
} = require("../constant/app.constant");

class Api {
    publishKafkaMessage = async (req, res, next) => {
        try {
            const { stream, message } = req.body;
            await kafkaService.sendMessage(KAFKA_TOPIC, [
                {
                    key: Math.random().toString(),
                    value: JSON.stringify({ stream, message }),
                },
                {
                    key: Math.random().toString(),
                    value: JSON.stringify({ stream, message }),
                },
            ]);
            res.status(200).json({
                status: "success",
                message: "message pushed to kafka",
            });
        } catch (error) {
            next(error);
        }
    };

    publishKafkaBatchMessage = async (req, res, next) => {
        try {
            const { message1, message2, message3 } = req.body;
            const batchMessages = [
                {
                    topic: KAFKA_BATCH_TOPIC.TOPIC_1,
                    messages: [
                        { key: Math.random().toString(), value: message1 },
                        { key: Math.random().toString(), value: message1 },
                    ],
                },
                {
                    topic: KAFKA_BATCH_TOPIC.TOPIC_2,
                    messages: [
                        { key: Math.random().toString(), value: message2 },
                        { key: Math.random().toString(), value: message2 },
                    ],
                },
                {
                    topic: KAFKA_BATCH_TOPIC.TOPIC_3,
                    messages: [
                        { key: Math.random().toString(), value: message3 },
                        { key: Math.random().toString(), value: message3 },
                    ],
                },
            ];
            await kafkaService.sendBatchMessages(batchMessages);
            res.status(200).json({
                status: "success",
                message: "kafka batch message sent to list",
            });
        } catch (error) {
            next(error);
        }
    };

    publishKafkaTransaction = async (req, res, next) => {
        try {
            const { message } = req.body;
            const messages = [
                { key: Math.random().toString(), value: message },
            ];
            await kafkaService.sendTransactionMessage(
                KAFKA_TRANSACTION_TOPIC,
                messages
            );
            res.status(200).json({
                status: "success",
                message: "Kafka transaction message",
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new Api();
