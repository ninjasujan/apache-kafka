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
        this.producer = this.kafka.producer({
            allowAutoTopicCreation: true,
            transactionTimeout: 3000,
        });
        await this.producer.connect();
        this.producer.on(this.producer.events.CONNECT, () => {
            console.log("[Kafka Producer connected]");
        });
    };
}

module.exports = KafkaBroker;
