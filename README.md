### Apache kafka - Message Queue.

DKafka ecouples data stream from our system.
Offloading the work from one server to many small worker, it creates a communication pipeline in with microservice.
Works on the basis of pub sub architecture model.

**Use case of apache kafka.**

    1. Message system
    2. Activity Tracking
    3. Gather metric data from different location.
    4. Apps log gathering.

**Component of Kafka:**

1. Kafka brokers - server listen on port - 9092
2. Producer - connect to the broker using TCP
3. Topics - Producer writes message.
4. Producer - Writes a message to the topic.
5. Consumer - Picks up the message from the queue and start to process.
6. Partition - Topics can have many partition to write a message. partition is necessary to avoid latency.
7. Consumer group - Consume the message from the partition topics, Each partition must be consumed by one consumer.

**How to setup project?**

1. clone the repo.
2. run `docker-compose up` command to start apache kafka and zookeeper
3. install all dependencies `npm i` (install all dependencies separately in both node-producer and node-consumer)
4. Add environent variable in both the server
5. star the server.

Note: docker image is used start kafka in localhost.
