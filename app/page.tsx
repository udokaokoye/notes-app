import { Note } from '@/types';
import NoteComponent from '@/Components/NoteComponent'

export default function Home() {

  const notes: Note[] = [];

  notes.push({
    title: "hello",
    content: "Hello Content",
    created: "09/44/55",
    updated: "55/22/11"
  })
  return (
    <main className=" mainContainer">
      <div className="header p-5"><h2>Note List</h2></div>
      <div className="containerWrapper">
      <div className="subHeader p-5"><h3>Notes</h3> <span className='notesCount'>{notes.length}</span></div>

      {notes.map((note: Note) => (
        <NoteComponent />
      ))}

      </div>
    </main>
  )
}
