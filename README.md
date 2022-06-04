# apache-kafka

**Sample demo project to understand the basics of apache kafka - produce and consume message.**

**How to setup project?**

1. clone the repo.
2. run `docker-compose up` command to start apache kafka and zookeeper
3. install all dependencies `npm i` (install all dependencies separately in both node-producer and node-consumer)
4. Add environent variable in both the server
5. star the server.

Note: docker image is used start kafka in localhost.

**Some Kafka commands**

first start zookeeper -bin/zookeeper-server-start.sh config/zookeeper.properties

then start kafka server -bin/kafka-server-start.sh config/server.properties

Zookeeper port ; 2181
kafka server: 9092

creating topics:

    bin/kafka-topics.sh —create --bootstrap-server localhost:9092 —topic cities

list all topics

    bin/kafka-topics.sh —list —zookeeper localhost:2181

produce message to topics

    bin/kafka-console.produce.sh —broker-list localhost:9092 —topic cities

Producer - broker(multiple - in case of failure) - consumer.

**Zookeeper**
maintain list of active broker - elects controller
manage config of topics and partition
