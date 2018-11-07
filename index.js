const chalk = require("chalk");
const cluster = require("cluster");
const os = require("os");
cluster.on("exit", worker => {
  console.log(
    chalk.yellow("[Cluster]"),
    "Worker kết thúc.",
    worker.process.pid
  );
  console.log(chalk.yellow("[Cluster]"), "Stop:", worker.exitedAfterDisconnect);

  if (!worker.exitedAfterDisconnect) {
    cluster.fork();
  }
});
//Is the file being excuted in master mode
if (cluster.isMaster) {
  //Master process
  console.log(
    chalk.red("[Cluster]"),
    "Master process đang bắt đầu chạy.",
    process.pid
  );
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  //Worker process
  require("./server");
  console.log(chalk.red("[Worker]"), "Worker start from.", process.pid);
}
