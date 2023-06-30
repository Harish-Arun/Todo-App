// import { useEffect } from "react";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
function LoginForm(props){
    function handleClick(e){
        e.preventDefault();
        props.setSign("register");
        
    }





    const [data,setData]=useState({email:"",password:""});
    const refEmail= useRef(null);
    const refPassword=useRef(null);

    const [error,setError]=useState(false);



    const navigate=useNavigate();
    const handleSubmit =(e)=>{
        e.preventDefault();
        fetch("http://localhost:5000/auth/login",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(datas=>{
            console.log(datas);
            if(datas.status==="success"){
                setError(false);
                navigate("/todo");

            }
            else{
                setData({email:"",password:""});
                refEmail.current.value='';
                refPassword.current.value='';
                setError(true);    
            }
            });
        
        // fetch('http://localhost:5000/store',{
        //     method: 'POST',
        //     body: JSON.stringify(msg)
        // }).then(function(res){
        //     console.log(res)
        // });

    }
    
    return(
        <div className="login-box-container">
            <h1>Signin to your account</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col my-8">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Email</label>
                    <input ref={refEmail} type="email" name="email" id="email" onChange={e=>setData({...data,email:e.target.value})} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@email.com"/>
                </div>

                <div className="flex flex-col my-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Password</label>
                    <input ref={refPassword} type="password" name="password" id="password" onChange={e=>setData({...data,password:e.target.value})} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="*******"/>
                </div>
                {error?<h4 className="text-red-700 text-sm ">* Username and password doesnt match</h4>:<></>}
                <div className="flex flex-col my-5 items-center">
                    <button type="submit" className="login-button"> Sign in</button>
                    <div className="flex flex-row my-5">
                        <p className="cursor-default">Don't have an account yet?</p>
                        <p className="text-blue-700 cursor-pointer" onClick={handleClick}>Sign Up</p>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;