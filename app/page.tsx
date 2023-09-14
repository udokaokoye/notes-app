import { Note } from '@/types';
import NoteComponent from '@/Components/NoteComponent'
import Link from 'next/link';

export default async function Home () {

    const res = await fetch('http://127.0.0.1:8000/notes/', {cache: 'no-cache'});
    let notes: Note[]= await res.json()



  return (
    <main className=" mainContainer">
      <div className="header p-5"><h2>Note List</h2></div>
      <div className="containerWrapper">
      <div className="subHeader p-5 flex items-center"><h3>Notes</h3> <span className='notesCount'>{notes.length}</span></div>

      {notes.map((note: Note) => (
        <Link href={`/${note.id}`} key={note.id}>
        <NoteComponent note={note} />
        </Link>
      ))}


<Link href="/new"><div className="floatingAddBtn">
  +
</div>
</Link>
      </div>
    </main>
  )
}
