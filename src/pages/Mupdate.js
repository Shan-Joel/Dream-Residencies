import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import faq from '../assets/jpg/faq.jpg';
//import './monadi.css';

function Mupdate() {
   return (
      <div>
         <Typography gutterBottom variant="h4" align="center">
            Manage FAQ
         </Typography>

         <Card style={{ maxWidth: 650, margin: '0 auto', padding: '20px 5px' }}>
            <CardContent>
               <center>
                  <img src={faq} height={200} width={200} />
               </center>
               <Typography gutterBottom variant="h5">
                  Update FAQ
               </Typography>
               <form>
                  <Grid container spacing={1}>
                     <Grid xs={12} item>
                        <TextField label="Question" multiline rows={2} placeholder="Enter FAQ Question Here" variant="outlined" fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <TextField label="Answer" multiline rows={5} placeholder="Enter Answer Here" variant="outlined" fullWidth required />
                     </Grid>

                     <Grid container direction="row" justifyContent="center" alignItems="center" xs={6} item>
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                           Update
                        </Button>
                     </Grid>
                  </Grid>
               </form>

               <br></br>
               <br></br>
               <br></br>
               <Typography variant="body2" component="p">
                  Edit or Delete FAQ click the below button
               </Typography>
               <br></br>
               <Grid item>
                  <Button color="secondary" variant="contained" fullWidth>
                     Manage FAQ
                  </Button>
               </Grid>
            </CardContent>
         </Card>
      </div>
   );
}

export default Mupdate;
