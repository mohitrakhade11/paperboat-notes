import { async } from "@firebase/util";
import { React, useState } from "react";
import noteDataService from "../../services/note.services";
import "./addnote.css";
const AddNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [status, setstatus] = useState("notdone");
  const [flag, setFlag] = useState(true);
const [message, setMessage] = useState({error:false,msg:""})
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setMessage("");
    if(title===""|| note===""){
        setMessage({error:true,msg:"all feilds imp"})
        return;
    }
    const newNote={
            title,
            note,
            status
    }
    console.log(newNote)

    try {
        await noteDataService.addNotes(newNote);
        setMessage({error:false,msg:"new note added sucsess"});
    }catch(err){
        setMessage({error:true,msg:err.message})
    }
    setTitle("")
    setNote("")
  }
  return (
    <div>
        {message?.msg&&(<p></p>)}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="add note title" value={title} 
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input type="text" placeholder="add note" value={note}
                onChange={(e)=>setNote(e.target.value)}
        />
        <div>
          <button
          disabled={flag}
          onClick={(e)=>{
              setstatus("done")
              setFlag(true)
          }}
          >Available</button>
          <button
           disabled={flag}
           onClick={(e)=>{
               setstatus("not-done")
               setFlag(false)
           }}
          >unAvailable</button>
        </div>

        <button type="submit">Add/Update Note</button>
      </form>
    </div>
  );
};

export default AddNote;
