import { doc } from 'firebase/firestore';
import "./noteslist.css"
import React, { useEffect,useState } from 'react'
import noteDataService from "../../services/note.services";
import { async } from '@firebase/util';

const NoteList = ({getNoteId}) => {
    const [notes, setNotes] = useState([])
    useEffect(()=>{
        getNotes()
    },[])

    const getNotes= async()=>{
        const data = await noteDataService.getallNotes()
        setNotes(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    } 
    const deleteHandler =async(id)=>{
        await noteDataService.deleteNote(id)
        getNotes()
    }
  return (
    <div>
        {/* <pre>{JSON.stringify(notes,undefined,2)}</pre> */}
        <button onClick={getNotes} type="submit">refresh</button>
        this is notelist
        <div style={{color:"red"}}>
            {notes.map((doc,index)=>{
                return(
                    <div className='noteslist' key={doc.id}>
                        <span>{index+1}</span>
                        <span>{doc.title}</span>
                        <span>{doc.note}</span>
                        <span>{doc.status}</span>
                        <span><button onClick={(e)=> getNoteId(doc.id)}>edit</button>
                        <button
                         onClick={(e)=> deleteHandler(doc.id)}
                        >delete</button>
</span>
                    </div>
                    

                )
            })}
        </div>
    </div>
  )
}

export default NoteList