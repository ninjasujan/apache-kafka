const Kafka = require("../provider/Kafka");

class KafkaService {
    produceMessage = async (topic, messages) => {
        await Kafka.producer.send({
            topic,
            messages,
        });
        console.log("[Message added to Kafka cluster]");
    };
}

module.exports = new KafkaService();
