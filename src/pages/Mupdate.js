import { Button, Card, CardContent, Grid, TextField, Typography, } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import faq from '../assets/jpg/faq.jpg';
import faq4 from '../assets/jpg/faq4.jpg';
import {useHistory, useNavigate, useParams , Link } from "react-router-dom";

import './monadi.css';
import { db } from '../firebase.config';
import { toast } from "react-toastify";
import { collection, getDoc, addDoc, updateDoc, doc ,update} from "@firebase/firestore";
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

const initialState = {
  question: "",
  answer: "",
};

const Mupdate = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});


  const {question, answer} = state;


  const navigate = useNavigate();

  const {id} = useParams();



  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!question || !answer){
      toast.error("Please provide value in each input field");
    }else{
     
      db.ref('FAQs').push(state, (err) => {
        if(err){
          toast.error(err);
        }else{
          toast.success("FAQ Added Successfully");
        }
      });
      setTimeout(() => navigate.push("/"), 500);
      navigate('/manage-faq');
    }
  };



  



  return (

   <div className="profile">
   <header>

   <p className="pageHeader">Add FAQ</p>

</header>

<div className="form-container">

   <div className="flex-center mb-20">

      <img src={faq4} height={200} width={400} />

   </div>

   <form onSubmit={handleSubmit}>

      <input style={{ height: '100px' }} type="text" label="Question" name="question" id="question" value={question} className="questionInput mb-20" placeholder="Enter Your Question" onChange={handleInputChange}
      />



      <input style={{ height: '200px' }} type="text" label="Answer" name="answer" className="textarea"  value={answer} placeholder="Enter Answer" id="answer"  onChange={handleInputChange}
      />



      <button className="signInBtn-2" type="submit" value="Save">Update FAQ</button>

   </form>
   <br></br>
   <center>
   <p>Edit or Delete FAQ click the below button</p>
   </center>
   <Link to="/manage-faq">
   <button  className="signInBtn-2">Manage FAQ</button>
   </Link>
</div>

</div>

);

}


export default Mupdate;
