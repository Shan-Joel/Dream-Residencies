import { Button, Card, CardContent, Grid, TextField, Typography,  } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import faq from '../assets/jpg/faq.jpg';
import {useNavigate, useParams} from "react-router-dom";

import './monadi.css';
import {db} from '../firebase.config';
import {toast} from "react-toastify";
import {collection, getDocs, addDoc} from "@firebase/firestore";


// const initialState = {
//   question: "",
//   answer: "",
// };

// const Mfaq = () => {
//   const [state, setState] = useState(initialState);
//   const [data, setData] = useState({});

//   const {question, answer} = state;

//   const navigate = useNavigate();
// //  navigate('/Mview');
  
//   //const history = useHistory();

//   const handleInputChange = (e) => {
//     const {name, value} = e.target;
//     setState({...state, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(!question || !answer){
//       toast.error("Please provide value in each input field");
//     }else{
//       db.child(db,"FAQs").push(state, (err) => {
//         if(err){
//           toast.error(err);
//         }
//         else{
//           toast.success("FAQ Added Successfully");
//         }
//       });
//       setTimeout(() => navigate.push("/"), 500);
//     }
//   };

function Mfaq() {

  const [newQuestion, setnewQuestion] = useState("")
  const [newAnswer, setnewAnswer] = useState("")
 
  const [FAQs, setFAQs] = useState([]);
  const userCollectionRef = collection(db , "FAQs")



const createFAQ = async () => {
  
    await addDoc(userCollectionRef, {question:newQuestion, answer:newAnswer});
 
}


  //  const handleInputChange = (e) => {
  //    const {name, value} = e.target;
  //    setState({...state, [name]: value });
  //  };

    //  const handleSubmit = async (e) => {
    //    e.preventDefault();
    //    if(!question || !answer){
    //      toast.error("Please provide value in each input field");
    //    }else{
    //      db.child(db,"FAQs").push(state, (err) => {
    //        if(err){
    //         toast.error(err);
    //        }
    //       else{
    //          toast.success("FAQ Added Successfully");
    //        }
    //      });
    //     setTimeout(() => navigate.push("/"), 500);
    //    }
    //  };



  




  return(
    <div>
      <Typography gutterBottom variant='h4' align='center'>
        Manage FAQ
      </Typography>

      <Card style={{maxWidth:650, margin:"0 auto" ,padding:"20px 5px"}}>
        <CardContent>
          {<center><img src={faq} height={200} width={200} /></center> }
          <Typography gutterBottom variant='h5'>Add FAQ</Typography>

             {/* <form>    */}

          <Grid container spacing={1}>

            <Grid xs={12} item>
              <TextField label="Question" name="question"  multiline rows={2} placeholder='Enter FAQ Question Here' variant='outlined'  onChange={(event) => {
                setnewQuestion(event.target.value);
              }} fullWidth required />
            </Grid>


            <Grid xs={12} item>
              <TextField label="Answer" name="answer" multiline rows={5} placeholder='Enter Answer Here' variant='outlined'  onChange={(event) => {
                setnewAnswer(event.target.value);
              }}  fullWidth required />
            </Grid>

            <Grid item>
              <Button  type="submit" color="primary" variant='contained' onClick={createFAQ} fullWidth>Submit</Button>
            </Grid>

          </Grid>
            {/* </form>    */}

          <br></br>
          <Typography variant='body2' component="p" >Edit or Delete FAQ click the below button</Typography>
            <Grid  item>
              <Button color='secondary' variant='contained' a href="/manage-faq">Manage FAQ</Button>
            </Grid>

        </CardContent>
      </Card>

    </div>
  );

  

}


export default Mfaq;

