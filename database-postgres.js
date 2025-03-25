import { randomUUID } from "node:crypto"
import sql from './dbs.cjs'

export class DatabasePostgres {
  #itens = new Map()

  //set (~array que nao aceita valores duplicados), map(obj)
  async create(video)
  {
    const videoId = randomUUID()

    const { title, description, duration } = video
    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, 
                                                                            ${title},
                                                                            ${description},
                                                                            ${duration})`
  }

  async read(search)
  {
    let videos 
    if(search)
    {
      // seleciona toso os videos onde o titulo contenha o termo search, independente da caixa alto/baixa (ilike) 
      // e da ordem das palavras no titulo (%palavra buscada%)
      videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
      
    }
    else
    {
      videos = await sql`select * from videos`
    } 

    return videos
  }

  async update(id, video)
  {
    const { title, description, duration } = video

    await sql`update videos set title = ${title},
                                description = ${description},
                                duration = ${duration}
                                WHERE id=${id}`
  }

  async delete(id)
  {
    await sql`delete from videos where id=${id}`
  }
}