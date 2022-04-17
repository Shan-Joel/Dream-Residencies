import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import './monadi.css';
import {db} from '../firebase.config';
import {collection, getDocs} from "firebase/compat/firestore";

function Mview() {

  const [FAQs, setFAQs] = useState([]);
  const userCollectionRef = collection(db , "FAQs");

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
        View FAQ
      </Typography> 

      {FAQs.map((FAQ) => {
        return (
        <div className='view'> 
          {" "}
          <h3> Question: {FAQ.question} </h3>
          <h3> Answer: {FAQ.answer} </h3>
        </div>
      );
      })}
      

    </div>
  );
}

export default Mview;
