const { Kafka } = require("kafkajs");
const {
    KAFKA_CLENT_ID,
    KAFKA_TOPIC,
    KAFKA_CONSUMER_GROUP_ID,
    KAFKA_BATCH_TOPIC,
    KAFKA_TRANSACTION_TOPIC,
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
            topics: [
                KAFKA_TOPIC,
                KAFKA_TRANSACTION_TOPIC,
                ...Object.values(KAFKA_BATCH_TOPIC),
            ],
            fromBeginning: true,
        });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {
                console.log("[processing each message]");
                console.log("[Topic]", topic);
                console.log("[Message]", message.value.toString());
            },
            eachBatchAutoResolve: true,
            eachBatch: async ({
                batch,
                resolveOffset,
                heartbeat,
                isRunning,
                isStale,
            }) => {
                console.log("[Batch message processing");
                for (let message of batch.messages) {
                    console.log({
                        topic: batch.topic,
                        partition: batch.partition,
                        highWatermark: batch.highWatermark,
                        message: {
                            offset: message.offset,
                            key: message.key.toString(),
                            value: message.value.toString(),
                            headers: message.headers,
                        },
                    });
                    resolveOffset(message.offset);
                    await heartbeat();
                }
            },
        });
    };
}

module.exports = KafkaBroker;
