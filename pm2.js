const chalk = require("chalk");
//Worker process
const express = require("express");
const crypto = require("crypto");
const app = express();

/**
 *  Blocking event loop
 */
const doWork = duration => {
  const start = Date.now();
  while (Date.now() - start < duration) {}
};

app.get("/", (req, res) => {
  //   doWork(300);
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("Hello world from process " + process.pid + ".");
  });
  //   res.send("test");
});

app.get("/fast", (req, res) => {
  res.send("Fast");
});

app.listen(3005);

console.log(chalk.red("[Worker]"), "Worker start from.", process.pid);
