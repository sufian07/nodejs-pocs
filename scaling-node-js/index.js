const { fork } = require('child_process');

const processes = [
    fork('./app', ['3002']),
    fork('./app', ['3003']),
    fork('./app', ['3004'])
];

console.log(`Forked ${processes.length} processes`);