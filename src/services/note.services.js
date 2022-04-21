import { db } from "../FirebaseConfig";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AddNote from "../componants/addnote/AddNote";

const NoteCollectionRef = collection(db,"notes")
class noteDataService {
   addNotes=(newNote)=>{
       return addDoc(NoteCollectionRef,newNote)
   };
   updateNote=(id , updatedNote)=>{
       const noteDoc = doc(db,"notes",id);
       return updateDoc(noteDoc,updatedNote)
   };
   deleteNote =(id)=>{
    const noteDoc = doc(db,"notes",id);
       return deleteDoc(noteDoc)
   };
    getallNotes =()=>{
        return getDocs(NoteCollectionRef)
    };
    getNote =(id)=>{
    const noteDoc = doc(db,"notes",id);
    return getDocs(noteDoc);
    }
}

export default new noteDataService();