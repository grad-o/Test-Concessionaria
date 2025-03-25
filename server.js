import { fastify } from "fastify"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

const database = new DatabasePostgres()

// post, get, put, delete
// Route Parameter /:id
// Request body post e put (pode enviar um corpo pra esses, enviar o formulario)
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({
    title, //title: titulo
    description,
    duration,
  })

  console.log(database.read())

  return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
  const search = request.query.search

  const videos = await database.read(search)
  
  return videos
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  await database.update(videoId, 
  {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})  

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id

  database.delete(videoId)

  return reply.status(304).send()
})
  

server.listen
({
  port: process.env.PORT ?? 3300,
})