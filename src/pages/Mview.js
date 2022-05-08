import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState, useRef } from 'react';
import './monadi.css';
import {db} from '../firebase.config';
import {collection, getDocs} from "@firebase/firestore";
import faq from '../assets/jpg/faq4.jpg';
import {useReactToPrint} from 'react-to-print';
import { render } from '@testing-library/react';
import Pdf from "react-to-pdf";


function Mview() {

  const [FAQs, setFAQs] = useState([]);
  const userCollectionRef = collection(db , "FAQs");


  const [query, setQuery] = useState("");
  console.log(query);

  const ref = React.createRef();


  useEffect(() => {
    const getFAQs = async () => {
      const data = await getDocs(userCollectionRef);
      setFAQs(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getFAQs();
  }, []);





///////







////////


  return (

    <div className="profile" ref={ref}>

    <div className='App' >
      <p className="pageHeader"> View FAQ  </p>
        
      
      <input type="text" placeholder="Search..." className="search" 
      onChange={(e) => setQuery(e.target.value)}
      />


      <Pdf targetRef={ref} filename="faq.pdf">
        {({ toPdf }) => <button onClick={toPdf} className="signInBtn-3"> Download as PDF</button>}
      </Pdf>


       
      

      {FAQs.filter((FAQ) => 
       FAQ.question.toLowerCase().includes(query) ||
       FAQ.answer.toLowerCase().includes(query)
       ).map((FAQ) => {
        return (
        <div className='view' key={FAQ.id} > 
          {" "}
          <p className='q' >  Question: </p><p className='qati'>{FAQ.question} </p>
     
          <p className='a'> Answer    : </p><p className='qatii'>{FAQ.answer} </p>
        </div>
      );
      })}
      

      </div>
      </div>

 
  );


}


export default Mview;
