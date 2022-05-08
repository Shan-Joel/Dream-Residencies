import { Button, Card, CardContent, Grid, TextField, Typography, } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import faq from '../assets/jpg/faq.jpg';
import faq4 from '../assets/jpg/faq4.jpg';
import { useNavigate, useParams , Link } from "react-router-dom";

import './monadi.css';
import { db } from '../firebase.config';
import { toast } from "react-toastify";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

// const initialState = {
//   question: "",
//   answer: "",
// };

// const Mfaq = () => {
//   const [state, setState] = useState(initialState);
//   const [data, setData] = useState({});

  // const {question, answer} = newQuestion;


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
  const userCollectionRef = collection(db, "FAQs")

  const navigate = useNavigate();
   


  const createFAQ = async () => {

    
    if(!newQuestion || !newAnswer){
      toast.error("Please provide value in each input field",{
        position: toast.POSITION.TOP_CENTER
      });
    }else{
      await addDoc(userCollectionRef, { question: newQuestion, answer: newAnswer });
    try {  
        
      toast.success('Successfully added FAQ!', {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error('Please try again!', {
        position: toast.POSITION.TOP_CENTER
      })
    }}

    // setTimeout(() => navigate.push("/"), 500);

    // navigate('/view-faq');
  }

  // const notify = () => {
  //   toast('Basic notification', {position: toast.POSITION.TOP_LEFT})
  //   toast.success('Success notification!',{
  //     position: toast.POSITION.TOP_CENTER
  //   })
  // }

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


 





  return (

    <div className="profile">
    <header>

    <p className="pageHeader">Add FAQ</p>

 </header>

 <div className="form-container">

    <div className="flex-center mb-20">

       <img src={faq4} height={200} width={400} />

    </div>

    {/* <form> */}

       <input style={{ height: '100px' }} type="text" label="Question" name="question" id="question" className="questionInput mb-20" placeholder="Enter Your Question" onChange={(event) => {
                 setnewQuestion(event.target.value);
               }} required />



       <input style={{ height: '200px' }} type="text" label="Answer" name="answer" className="textarea" placeholder="Enter Answer" id="answer"  onChange={(event) => {
                 setnewAnswer(event.target.value);
               }} required />



       <button className="signInBtn-2" type="submit" onClick={createFAQ} >Add FAQ</button>

    {/* </form> */}
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

    // <div>
    //   <Typography gutterBottom variant='h4' align='center'>
    //     Manage FAQ
    //   </Typography>

    //   <Card style={{maxWidth:650, margin:"0 auto" ,padding:"20px 5px"}}>
    //     <CardContent>
    //       {<center><img src={faq} height={200} width={200} /></center> }
    //       <Typography gutterBottom variant='h5'>Add FAQ</Typography>

    //          {/* <form>    */}

    //       <Grid container spacing={1}>

    //         <Grid xs={12} item>
    //           <TextField label="Question" name="question"  multiline rows={2} placeholder='Enter FAQ Question Here' variant='outlined'  onChange={(event) => {
    //             setnewQuestion(event.target.value);
    //           }} fullWidth required />
    //         </Grid>


    //         <Grid xs={12} item>
    //           <TextField label="Answer" name="answer" multiline rows={5} placeholder='Enter Answer Here' variant='outlined'  onChange={(event) => {
    //             setnewAnswer(event.target.value);
    //           }}  fullWidth required />
    //         </Grid>

    //         <Grid item>
    //           <Button  type="submit" color="primary" variant='contained' onClick={createFAQ} fullWidth>Submit</Button>
    //         </Grid>

    //       </Grid>
    //         {/* </form>    */}

    //       <br></br>
    //       <Typography variant='body2' component="p" >Edit or Delete FAQ click the below button</Typography>
    //         <Grid  item>
    //           <Button color='secondary' variant='contained' a href="/manage-faq">Manage FAQ</Button>
    //         </Grid>

    //     </CardContent>
    //   </Card>

    // </div>

  //);



}


export default Mfaq;

