import React, { Component ,useState, useEffect} from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import {collection, getDocs, addDoc} from "@firebase/firestore";
import {db} from '../firebase.config';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from "react-toastify";

toast.configure()

function Mcontact() {


   const [newFirstName, setnewFirstName] = useState("")
   const [newLastName, setnewLastName] = useState("")
   const [newEmail, setnewEmail] = useState("")
   const [newQuirys, setnewQuirys] = useState("")
 
   const [contacts, setcontacts] = useState([]);
   const userCollectionRef = collection(db , "contacts")


   const createContacts = async () => {
      await addDoc(userCollectionRef, {FirstName:newFirstName, LastName:newLastName, Email:newEmail, Quirys:newQuirys});


      try {
         toast.success('Successfully added information!',{
           position: toast.POSITION.TOP_CENTER
         })
       } catch (error) {
         toast.error('Please try again!',{
           position: toast.POSITION.TOP_CENTER})
       }

     }
     





   return (
      <div>
         <Typography gutterBottom variant="h4" align="center">
            Contact Us
         </Typography>

         <Card style={{ maxWidth: 650, margin: '0 auto', padding: '20px 5px' }}>
            <CardContent>
               <Typography gutterBottom color="textSecondary" variant="body2" component="p">
                  You can contact us from here for further clarifications.After you fill the below form, our member will contact you soon.
               </Typography>
               <br></br>
               {/* <form> */}
                  <Grid container spacing={1}>
                     <Grid xs={12} sm={6} item>
                        <TextField label="First Name" name="FirstName" placeholder="Enter First Name" variant="outlined" onChange={(event) => {
                        setnewFirstName(event.target.value);
                        }}fullWidth required />
                     </Grid>

                     <Grid xs={12} sm={6} item>
                        <TextField label="Last Name" name="LastName" placeholder="Enter Last Name" variant="outlined" onChange={(event) => {
                         setnewLastName(event.target.value);
                         }}fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <TextField type="email" name="Email" label="Email" placeholder="Enter Email Address" variant="outlined" onChange={(event) => {
                        setnewEmail(event.target.value);
                        }}fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <TextField label="Quirys" name="Quirys" multiline rows={5} placeholder="Enter Question or Message" variant="outlined" onChange={(event) => {
                        setnewQuirys(event.target.value);
                        }} fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <button type="submit" variant="contained" className="signInBtn-2"  onClick={createContacts} fullWidth>
                           Submit
                        </button>
                     </Grid>
                  </Grid>
               {/* </form> */}
            </CardContent>
         </Card>
      </div>
   );
}

export default Mcontact;
