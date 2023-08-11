const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: 'nk',
    brokers: ["localhost:9092"]
});