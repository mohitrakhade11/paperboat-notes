// import { async } from "@firebase/util";
import { React, useEffect, useState } from "react";
import noteDataService from "../../services/note.services";
import "./addnote.css";
const AddNote = ({ id, setNoteId}) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [status, setstatus] = useState("notdone");
  const [flag, setFlag] = useState(false);
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
const editHandler=async()=>{
  setMessage("");
  try{
      const docSnap= await noteDataService.getNote(id);
      console.log("the record is", docSnap.data())
      setTitle(docSnap.data().title)
      setNote(docSnap.data().note)
      setstatus(docSnap.data().status)
  }catch(err){
      setMessage({error:true,msg:err.message})
  }
}

  useEffect(()=>{
      console.log("id here is",id)
    if( id!== undefined && id!== ""){
        editHandler()
    }
  },[id])
  return (
    <div>
        {message?.msg&&(<p></p>)}
      <form onSubmit={handleSubmit}>
       <div className="input-container">
       <input className="inputtitle" type="text" placeholder="add note title" value={title} 
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input className="inputnote" type="text" placeholder="add note" value={note}
                onChange={(e)=>setNote(e.target.value)}
        />
       </div>
        <div>
          {/* <button
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
          >unAvailable</button> */}
        </div>

        <button className="addbtn" type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
