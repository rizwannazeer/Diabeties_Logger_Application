import { Grid } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import productService from "../../services/ProductsService";
import userService from "../../services/UserService";
import SingleProducts from './SingleProducts';
const Loger = (props) => {
    const [products,setProducts]=React.useState([]);

    const getData= ()=>{

        productService.getRecord() 
        .then(data=>{
             setProducts(data);
         }).catch(error=>{
             console.log(error);
         })
     }
     React.useEffect(getData,[]);

    // console.log("inside products");
    const handleNewProduct= ()=>{
        props.history.push("/New");
        console.log(props);

    }

    const useStyles = makeStyles((theme) => ({
       addBtn:{
           position:"fixed",
           bottom:theme.spacing(2),
           right: theme.spacing(2),
       }
      }));
      const classes=useStyles();    
      return ( 
    
    <div>
        <h1>All Records</h1>

        {userService.isLogIn() && <Fab color="primary" aria-label="add" className={classes.addBtn}
         onClick={handleNewProduct}>
        <AddIcon />
      </Fab>}
    {products.length ==0? <p>there is no products</p>: <Grid container spacing={5}>  {products.map((product,index)=> <SingleProducts key={index} product={product} onDelete={getData}/>) }</Grid>}
       
 </div> );
}
 
export default Loger;