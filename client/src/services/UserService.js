import { TrendingUp } from "@material-ui/icons";
import jwtDecode from "jwt-decode";
const { default: GenericService } = require("./GenericService");


class UserService extends GenericService{
 
    
 login=(Email,Password)=>
 new Promise((resolve,reject)=>
 {
    this.post("http://localhost:4000/users/login",{Email,Password})
    .then(token=>
        {
        localStorage.setItem("token",token);
        resolve(token);
    })
    .catch(err=>console.log(err))
}) 


register=(Name,Email,Password)=>this.post("http://localhost:4000/users/register",{Name,Email,Password});

logout=()=>{
    localStorage.removeItem("token");
}

isLogIn=()=>{
    return localStorage.getItem("token")? true:false
}

getLoggedInUser=()=>{
    try {
        const jwt=localStorage.getItem("token");
        return jwtDecode(jwt);

    } catch (ex) {
        return null;
    }
};

isAdmin=()=>{
if(this.isLogIn()){
    if(this.getLoggedInUser().role=="admin"){
        return true;
    } else return false
} else return false

}

}


let userService=new UserService();
export default userService;