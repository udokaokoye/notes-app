"use client";
import { Note } from "@/types";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
      setcontent(data.body);
    } catch (error) {
      return notFound();
    }
  }

  async function saveNote() {
    const formData = new FormData();
    let title: string = "";
    if (content == "") {
      formData.append("title", note.title);
      formData.append("body", "");
    } else {
      title = content.split("\n")[0];
      formData.append("title", title);
      formData.append("body", content);
    }

    const res = await fetch(`http://127.0.0.1:8000/notes/update/${note.id}`, {
      method: "PATCH",
      body: formData,
    });
    router.replace("/");
  }

  return (
    <main className=" mainContainer">
      <div className="header p-5">
        <h2>Edit Note</h2>
      </div>
      <div className="containerWrapper">
        <div className="subHeader p-5 flec items-center">
          <h3 className="flex gap-2 items-center" onClick={saveNote} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faChevronLeft} /> save
          </h3>{" "}
          <Link href={`/`}>
            <span className="notesCount">cancel</span>
          </Link>
        </div>

        <textarea
          onInput={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setcontent(e.target.value)
          }
          className="textarea p-5"
          value={content}
        ></textarea>
      </div>
    </main>
  );
};

export default EditNote;
