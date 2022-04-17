import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import './monadi.css';
import {db} from '../firebase.config';
import {collection, getDocs , doc, deleteDoc} from "firebase/firestore";

function ManageFAQ() {

  const [FAQs, setFAQs] = useState([]);
  const userCollectionRef = collection(db , "FAQs");

  const deleteFAQ = async (id) => {
      const userDoc = doc(db, "FAQs", id);
      await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getFAQs = async () => {
      const data = await getDocs(userCollectionRef);
      setFAQs(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getFAQs();
  }, []);

  return (
    <div className='App'>
      <Typography gutterBottom variant='h4' align='center'>
        Manage FAQ
      </Typography> 

      {FAQs.map((FAQ) => {
        return (
        <div className='view'> 
          {" "}
          <h3> Question: {FAQ.question} </h3>
          <h3> Answer: {FAQ.answer} </h3>
          <Grid item>
              <Button 
                onClick={() => {deleteFAQ(FAQ.id);
            }} 
            color="secondary" variant='contained' >
                {" "}
                Delete</Button>

                
              <Button  type="submit" color="primary" variant='contained' >Update</Button>

            </Grid>
        </div>
      );
      })}
      

    </div>
  );
}

export default ManageFAQ;
