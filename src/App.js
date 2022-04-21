import './App.css';
import { useState } from 'react';
import NoteList from './componants/notelist/NoteList';
import AddNote from "/Users/mohitrakhade/Desktop/projects/paperboat-notes/src/componants/addnote/AddNote.js"   
function App() {
  const [noteId, setNoteId] = useState("")

  const getNoteIdHandler=(id)=>{
    console.log("the id of doc to edit",id)
    setNoteId(id)
  }
  
  return (
    <div className="App">
    <AddNote id={noteId} />
    <NoteList getNoteId={getNoteIdHandler}/>
    </div>
  );
}

export default App;
