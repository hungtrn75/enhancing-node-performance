const chalk = require("chalk");
//Worker process
const express = require("express");
const Worker = require("tiny-worker");
const app = express();

app.get("/", (req, res) => {
  const worker = new Worker(function() {
    self.onmessage = function() {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      postMessage(counter);
    };
  });
  worker.onmessage = function(message) {
    console.log(message.data);
    res.send("" + message.data);
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("Fast");
});

app.listen(3005);

console.log(chalk.red("[Worker]"), "Worker start from.", process.pid);
