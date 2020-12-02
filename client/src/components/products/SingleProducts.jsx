import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import productService from "../../services/ProductsService";
import { withRouter } from "react-router";

import { Button, Grid } from "@material-ui/core";
import userService from '../../services/UserService';
const useStyles = makeStyles((theme) => ({
    h1: {
      color:"purple",
      borderLeft:"1px solid green"
      ,padding:"4px",
    }
  }));

const SingleProducts = (props) => {
 const {product,onDelete,history}=props;
  const classes = useStyles();
    return ( <Grid item xs={4}>
       
 
    
        <h1 className={classes.h1}> Medicine Type  

        
       <Button variant="contained" color="secondary" onClick={e=>{
          history.push("/New/update/"+product._id)
        }}>Update</Button>&nbsp;
        <Button variant="contained" color="primary" onClick={e=>{
          productService.deleteRecord(product._id)
          .then(data=>{console.log(data);
          onDelete();
          })
          .catch(err=>console.log(err))
        }}>Delete</Button>
        
         </h1>
        <p> {product.Medicine.Type}</p>

        <h1 className={classes.h1}> Medicine Dose</h1>
        <p> {product.Medicine.Dose}</p>

        <h1 className={classes.h1}> Exercise Type</h1>
        <p> {product.Exercise.Type}</p>

        <h1 className={classes.h1}> Exercise Duration</h1>
        <p> {product.Exercise.Duration}</p>

        <h1 className={classes.h1}> Time</h1>
        <p> {product.Time}</p>

        <h1 className={classes.h1}> Blood Sugar Level</h1>
        <p> {product.Blood_Sugar_Level}</p>

        <h1 className={classes.h1}> Amount of Carbohydrate</h1>
        <p> {product.Amount_of_Carbohydrate}</p>

        <h1 className={classes.h1}> Food Diary</h1>
        <p> {product.Food_Diary}</p>

        <h1 className={classes.h1}> Unusual Events</h1>
        <p> {product.Unusual_Events}</p>

        <hr></hr>

  </Grid> );
}
 
export default withRouter(SingleProducts);