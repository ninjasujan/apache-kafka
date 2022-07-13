const Kafka = require("../provider/Kafka");

class KafkaService {
    sendMessage = async (topic, messages) => {
        await Kafka.producer.send({
            topic,
            messages,
        });
        console.log("[Message added to Kafka cluster]");
    };

    sendBatchMessages = async (messages) => {
        await Kafka.producer.sendBatch({ topicMessages: messages });
    };
}

module.exports = new KafkaService();
