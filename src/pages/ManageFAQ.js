import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import './monadi.css';
import {db} from '../firebase.config';
import {collection, getDocs , doc, deleteDoc, updateDoc} from "@firebase/firestore";
import { green } from '@material-ui/core/colors';
import {toast} from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'
// import { Link } from 'react-router-dom';
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import EditIcon from "@mui/icons-material/Edit";
// import { async } from '@firebase/util';

toast.configure()

function ManageFAQ() {


  const [newQuestion, setnewQuestion] = useState("")
  const [newAnswer, setnewAnswer] = useState("")


  const [FAQs, setFAQs] = useState([]);
  const userCollectionRef = collection(db , "FAQs");



  const [query, setQuery] = useState("");
  console.log(query);

  const deleteFAQ = async (id) => {
    if(
      window.confirm("Are you sure that you wanted to delete that FAQ?")
    ){
      const userDoc = doc(db, "FAQs", id);
      await deleteDoc(userDoc);

      try {
        toast.success('Successfully deleted FAQ!',{
          position: toast.POSITION.TOP_CENTER,
          color: green
        })
      } catch (error) {
        toast.error('Please try again!',{
          position: toast.POSITION.TOP_CENTER})
      }

}}

  useEffect(() => {
    const getFAQs = async () => {
      const data = await getDocs(userCollectionRef);
      setFAQs(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getFAQs();
  }, []);






//  const handleEdit = async (FAQ, question, answer) => {
//    await updateDoc(doc(db, "FAQs", FAQ.id), {question: question, answer: answer});
//  };
//  const toggleComplete = async (FAQ) => {
//   await updateDoc(doc(db, "FAQs", FAQ.id), {
//     completed: !FAQ.completed
//   });
//  };









  return (
    <div className="profile">

   
    <div className='App'>
    <p className="pageHeader">Manage FAQ</p>

    <input type="text" placeholder="Search..." className="search" 
      onChange={(e) => setQuery(e.target.value)}
      />

    {/* </div><div className="form-container"> */}
      <div>

   
      {FAQs.filter((FAQ) => 
       FAQ.question.toLowerCase().includes(query) ||
       FAQ.answer.toLowerCase().includes(query)
       ).map((FAQ) => {
        return (
        <div className='view' key={FAQ.id} > 
          {" "}
          <p className='q'> Question: </p><textarea rows={2} className='qati' value={FAQ.question} 
           />
            <br></br>
          <p className='a'> Answer  : </p><textarea rows={5} className='qati' value={FAQ.answer} 
           /> 
         
          <div className="flex-end">
          



              <button onClick={() => {deleteFAQ(FAQ.id);
            }} 
             variant='contained' className="signInBtn-3" >
                {" "}
                {/* <img src={delete1} height={20} width={40} /> */}
                Delete </button>

              {/* <Link to={'/update-faq/${id}'} > */}
               <button className="signInBtn-3" type="submit"  variant='contained'>Update</button>
              {/* </Link> */}

        

           
          </div>
        </div>
      );
      })}
      

    </div>
    </div>
    </div>
  );
}




export default ManageFAQ;
