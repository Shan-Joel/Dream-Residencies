import React, { Component } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';

function Mcontact() {
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
               <form>
                  <Grid container spacing={1}>
                     <Grid xs={12} sm={6} item>
                        <TextField label="First Name" placeholder="Enter First Name" variant="outlined" fullWidth required />
                     </Grid>

                     <Grid xs={12} sm={6} item>
                        <TextField label="Last Name" placeholder="Enter Last Name" variant="outlined" fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <TextField type="email" label="Email" placeholder="Enter Email Address" variant="outlined" fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <TextField label="Quirys" multiline rows={5} placeholder="Enter Question or Message" variant="outlined" fullWidth required />
                     </Grid>

                     <Grid xs={12} item>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                           Submit
                        </Button>
                     </Grid>
                  </Grid>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}

export default Mcontact;
