"use client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";

function NewNote() {
  const [content, setcontent] = useState<string>("Start Writing...");
  const router = useRouter();
  const saveNote = async () => {
    let title: string = "";
    if (content == "Start Writing..." || content == "") {
      router.push("/");
    } else {
      title = content.split("\n")[0];
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("body", content);

      const res = await fetch("http://127.0.0.1:8000/notes/add", {
        method: "POST",
        body: formdata,
      });
      router.push("/");
      // console.log(jsonResponse)
    }
  };
  return (
    <main className=" mainContainer">
      <div className="header p-5">
        <h2>New Note</h2>
      </div>
      <div className="containerWrapper">
        <div className="subHeader p-5">
          <h3 onClick={saveNote} style={{ cursor: "pointer" }} className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faChevronLeft} /> save
          </h3>{" "}
          <Link href={`/`} className="flex items-center">
            <span className="notesCount">cancel</span>
          </Link>
        </div>

        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setcontent(e.target.value)
          }
          className="textarea p-5"
          placeholder="Start writing..."
        ></textarea>
      </div>
    </main>
  );
}

export default NewNote;
