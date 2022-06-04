const { Kafka } = require("kafkajs");
const {
    KAFKA_CLENT_ID,
    KAFKA_TOPIC,
    KAFKA_CONSUMER_GROUP_ID,
} = require("../constant/app.constant");
const Locals = require("./Locals");

class KafkaBroker {
    static kafka;
    static consumer;
    static init = async () => {
        this.kafka = new Kafka({
            clientId: KAFKA_CLENT_ID,
            brokers: [Locals.KAFKA_SERVER],
        });
        this.consumer = this.kafka.consumer({
            groupId: KAFKA_CONSUMER_GROUP_ID,
        });
        await this.consumer.connect();
        this.consumer.on(this.consumer.events.CONNECT, () => {
            console.log("[Kafka Consumer connected]");
        });
        this.subscribeToTopic();
        console.log("[Kafka initialized]");
    };

    static subscribeToTopic = async () => {
        await this.consumer.subscribe({
            topics: [KAFKA_TOPIC],
            fromBeginning: true,
        });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {
                console.log("[Topic]", topic);
                console.log("[Partition]", partition);
                console.log("[Message]", message.value.toString());
                console.log("[Heartbeat]", heartbeat);
            },
        });
    };
}

module.exports = KafkaBroker;
