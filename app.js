const fastify = require('fastify')()

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

fastify.get('/', async (request, reply) => {
  reply.type('text/plain').code(200)
  return 'Hi there!!!!'
})

fastify.listen(PORT, HOST, function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
