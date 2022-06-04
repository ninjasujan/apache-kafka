const { Kafka } = require("kafkajs");
const { KAFKA_CLENT_ID } = require("../constant/app.constant");
const Locals = require("./Locals");

class KafkaBroker {
    static kafka;
    static producer;
    static init = async () => {
        this.kafka = new Kafka({
            clientId: KAFKA_CLENT_ID,
            brokers: [Locals.KAFKA_SERVER],
        });
        this.producer = this.kafka.producer();
        await this.producer.connect();
        console.log("[Kafka initialized]");
    };
}

module.exports = KafkaBroker;
