var cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();

  cluster.on("exit", function(worker, code) {
    if (code != 0) {
      console.error("Worker crashed or was rebooted! Spawning a replacement.");
      cluster.fork();
    }
  });
} else {
  module.exports = require('./build/steam.js');
}
