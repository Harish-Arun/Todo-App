import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useState} from 'react';
function Auth(){
    const [sign,setSign]=useState("login");
    return(
        <div className="screen">
            <div className="login-box my-7">
                {sign==="login"?<LoginForm setSign={setSign}/>:<RegisterForm setSign={setSign}/>}
                
            </div>
        </div>
    )
}

export default Auth;