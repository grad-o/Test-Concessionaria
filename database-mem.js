import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  #itens = new Map()

  //set (~array que nao aceita valores duplicados), map(obj)
  create(video)
  {
    const videoId = randomUUID()

    this.#itens.set(videoId, video)
  }

  read(search)
  {
    return Array.from(this.#itens.entries()).map((videoArray) => 
    {
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id, 
        ...data,
      }
    })
    .filter(video => 
    {
      if(search)
      {
        return video.title.includes(search)
      }

      return true
    })
  }

  update(id, video)
  {
    this.#itens.set(id, video)
  }

  delete(id)
  {
    this.#itens.delete(id)
  }
}