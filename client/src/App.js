import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import chart from './components/chart';
import charts from './components/charts';
import ContactUs from './components/Contact';
import NotFound from './components/NotFound';
import Loger from './components/products/Loger';
import NewProduct from './components/products/NewProduct';
import UpdateProduct from './components/products/UpdateProduct';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





import TopMenu from './components/TopMenu';


function App() {
  return (
    <Router>
    <div>
    <ToastContainer />
    <TopMenu />
      <div style={{padding:"10px"}}>
      <Switch>
      <Route path="/New/update/:id" component={UpdateProduct}/>
      <Route path="/login" component={LogIn}/>
      <Route path="/register" component={Register}/>

      <Route path="/ContactUs" component={ContactUs} />
      <Route path="/charts" exact component={charts} />
      <Route path="/not-found" exact component={NotFound} />
      <Route path="/New" exact component={NewProduct} />

      <Route path="/" exact component={Loger} />
      

      <Redirect to ="/not-found"/>
  

      </Switch></div>
      
     
    </div></Router>
  );
}

export default App;

