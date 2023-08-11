const { Partitioners } = require("kafkajs");
const readline = require("readline");
const { kafka } = require("./kafka");
const { RIDER_UPDATES } = require("./topics");

const rlci = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    await producer.connect();
    rlci.setPrompt("> ");
    rlci.prompt();
    rlci.on('line', async function(line){
        const [name, location] = line.split(" ");
        await producer.send({
            topic: RIDER_UPDATES,
            messages:[
                {
                    partition: location,
                    key: "location-update",
                    value: JSON.stringify({
                        id: parseInt(Math.random()*100),
                        name,
                        location
                    })
                }
            ],
        });
    })
    .on('close', async ()=>{
        await producer.disconnect();
    })
}

init();