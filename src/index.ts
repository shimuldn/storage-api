import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import autoload from 'fastify-autoload'
import path from 'path'
import fastifyMultipart from 'fastify-multipart'
import fastifyCors from 'fastify-cors'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
})

// @todo - should we set upload limits here?
// https://github.com/fastify/fastify-multipart#handle-file-size-limitation
app.register(fastifyMultipart)

// @todo - restrict origin here
app.register(fastifyCors)

app.register(autoload, {
  dir: path.join(__dirname, 'routes'),
})

app.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
