"use client";
import { Note } from "@/types";
import { faChevronLeft, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const EditNote = ({ params }: { params: { noteId: string } }) => {
  const router = useRouter();
  const [note, setnote] = useState<Note>({
    id: 0,
    title: "",
    content: "",
    body: "",
  });
  const [content, setcontent] = useState<string>("Start Writing...");

  useEffect(() => {
    fetchNote();
  }, [router]);

  async function fetchNote() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/notes/${params.noteId}`);
    const data: Note = await res.json();
    // console.log(data);
    setnote(data);
    } catch (error) {
      return notFound()
    }
  }

  const deleteNote = async () => {
    const res = await fetch(`http://127.0.0.1:8000/notes/delete/${note.id}`, {method: "DELETE"});
    router.push("/");
  };

  return (
    <main className=" mainContainer">
      <div className="header p-5">
        <h2>View Note</h2>
      </div>
      <div className="containerWrapper">
        <div className="subHeader p-5">
          <h3 className="flex items-center gap-2" onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faChevronLeft} /> save
          </h3>{" "}
          <div className="flex gap-5 items-center">
          <Link href={`/edit/${note.id}`}>
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <span onClick={deleteNote}><FontAwesomeIcon icon={faTrash} /></span>
          </div>
        </div>

        <div
          onClick={() => router.push(`/edit/${note.id}`)}
          onInput={(e: ChangeEvent<HTMLDivElement>) =>
            setcontent(e.target.innerHTML)
          }
          className="textarea p-5"
        >
          {note.body}
        </div>
      </div>
    </main>
  );
};

export default EditNote;
