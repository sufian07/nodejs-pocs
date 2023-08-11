const { kafka } = require("./kafka");
const { RIDER_UPDATES } = require("./topics");

async function init() {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics:[{
            topic: RIDER_UPDATES,
            numPartitions: 2,
        }],
    });
    await admin.disconnect();
}

init();
