import { insert, getDB, saveDB } from './db.js'

export const newNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  }
  await insert(data)
  return data
}
export const getAllNotes = async () => {
  const db = await getDB()
  return db.notes
}

export const findNotes = async (filter) => {
  const notes = await getAllNotes()
  return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNote = async (id) => {
  const notes = await getAllNotes()
  const match = notes.find(note => note.id === id)

  if (match) {
    const newNotes = notes.filter(note => note.id !== id)
    await saveDB({notes: newNotes})
    return id
  }
}

// 可以不await因为没有在此之后发生的事情，像上面都是await拿到数据要再进行处理所以要等数据，此处不需要
export const removeAllNotes = async () => {
  await saveDB({notes: []})
}
