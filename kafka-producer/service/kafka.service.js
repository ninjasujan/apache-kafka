const Kafka = require("../provider/Kafka");

class KafkaService {
    /** Send kafka message  */
    sendMessage = async (topic, messages) => {
        await Kafka.producer.send({
            topic,
            messages,
        });
        console.log("[Message added to Kafka cluster]");
    };

    /** Send kafka batch messages */
    sendBatchMessages = async (messages) => {
        await Kafka.producer.sendBatch({ topicMessages: messages });
    };

    /** Initiate Kafka transaction */
    sendTransactionMessage = async (topic, messages) => {
        const transaction = await Kafka.producer.transaction();
        await transaction.send({ topic, messages });
        await transaction.commit();
    };
}

module.exports = new KafkaService();
