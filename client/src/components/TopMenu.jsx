import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/UserService';

const useStyles = makeStyles((theme) => ({
    link: {
      color:"white",
      padding:"1rem",
      textDecoration:"none"
    }
  }));
  
const TopMenu = (props) => {
    const classes = useStyles();
    return (
    <AppBar position="static">
        <Toolbar>
     

    

           {!userService.isLogIn()? <><Typography variant="h6">
            <Link className={classes.link} to="/logIn"> Log In</Link> 
            </Typography>
            <Typography variant="h6">
            <Link className={classes.link} to="/register"> Register</Link> 
           </Typography>
           </> : <>

                <Typography variant="h6" >

                    <Link className={classes.link} to="/">HOME</Link> 
            </Typography>

            <Typography variant="h6">
            <Link className={classes.link} to="/charts">Performance Chart </Link> 
            </Typography>

            <Typography variant="h6">
            <Link className={classes.link} to="/ContactUs">Contact Us</Link> 
            </Typography>
          
            <Button variant="contained" color="secondary" onClick={e=>{
             userService.logout();
             window.location.reload();
             window.location.href="/login"
           }}>LogOut {userService.getLoggedInUser().Name}
           </Button>

           </>
           
           }
           
           


        </Toolbar>
    </AppBar>
    );
}
 
export default TopMenu;