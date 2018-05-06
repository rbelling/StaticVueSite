const fastify = require("fastify")();
const path = require("path");
const pkg = require(path.join(__dirname, "package.json"));

const { port, host } = pkg.app;

// Register the fastify-static plugin to serve our static html files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "dist"),
  // https://github.com/fastify/fastify-static#prefix
  prefix: "/"
});

fastify.listen(port, host, function(err) {
  if (err) throw err;
  console.log(
    `Serving static files on http://${host}:${fastify.server.address().port}`
  );
});

fastify.get("/", async (request, reply) => {
  reply.sendFile("index.html");
});
