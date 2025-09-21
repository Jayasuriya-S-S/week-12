const server = require('./index');

console.log("Running simple test...");
if (server) {
  console.log("Server module loaded successfully - Test passed!");
} else {
  console.error("Server module not loaded - Test failed!");
  process.exit(1);
}
