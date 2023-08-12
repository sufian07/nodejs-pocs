const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus()

if(cluster.isMaster) {
    console.log(cpus.length);
    console.log("this is master process ", process.pid);
    for(let i=0; i<cpus.length; i++){
        cluster.fork();
    }
} else {
    // console.log(message);
    http.createServer((req, res)=>{
        const message = "this is worker process "+ process.pid
        console.log(message);
        res.end(message);
    }).listen(3000);
}