import { doc } from "firebase/firestore";
import "./noteslist.css";
import React, { useEffect, useState } from "react";
import noteDataService from "../../services/note.services";
import { async } from "@firebase/util";
import { MdOutlineDelete } from "react-icons/md";

const NoteList = ({ getNoteId }) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const data = await noteDataService.getallNotes();
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await noteDataService.deleteNote(id);
    getNotes();
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  return (
    <div>
      {/* <pre>{JSON.stringify(notes,undefined,2)}</pre> */}
      <button className="refreshbtn" onClick={getNotes} type="submit">
        refresh
      </button>
      <div className="parent">
        {notes.map((doc, index) => {
          return (
            <div className="notes-card-container">
                <div className="noteslist" key={doc.id}>
                  <span className="title">{doc.title}</span>
                  <span className="note">{doc.note}</span>
                  {/* <span>{doc.status}</span> */}
                  <span className="buttons-container">
                    <span className="date" onClick={(e) => getNoteId(doc.id)}>{today}</span>
                    <button className="dltbtn" onClick={(e) => deleteHandler(doc.id)}>
                    <MdOutlineDelete/>
                    </button>
                  </span>
                </div>      
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoteList;
