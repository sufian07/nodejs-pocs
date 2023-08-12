const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus()

if(cluster.isMaster) {
    console.log("this is master process ", process.pid);
    for(let i=0; i<cpus.length; i++){
        cluster.fork();
    }
    cluster.on('exit', worker => {
        console.log(worker);
        console.log(`worker process ${process.pid} has died`);
        console.log('starting new worker');
        cluster.fork();
    });
} else {
    console.log(`started a worker process at ${process.pid}`);
    http.createServer((req, res)=>{
        const message = "this is worker process "+ process.pid
        res.end(message);
        if(req.url == '/kill') {
            process.exit();
        } else if (req.url == '/') {
            console.log(message);
        }
    }).listen(3000);
}