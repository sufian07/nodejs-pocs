const { kafka } = require("./kafka");
const { RIDER_UPDATES } = require("./topics");
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({ groupId: group });
    await consumer.connect();
    await consumer.subscribe({ topics: [RIDER_UPDATES], fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`[GROUP:: ${group}][TOPIC:: ${topic}]:: [PARTITION:: ${partition}]:: `, message.value.toString());
        }
    });
    // await consumer.disconnect();
}
init();