import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";

function RegisterForm(props){
    function handleClick(e){
        e.preventDefault();
        props.setSign("login");
    }

    const [data,setData]=useState({firstname:"",lastname:"",email:"",password:""});
    const [error,setError]=useState(false);
    const {user,login}=useAuthContext();

    const refFirstName=useRef(null);
    const refLastName=useRef(null);
    const refEmail=useRef(null);
    const refPassword=useRef(null);

    const navigate=useNavigate();
    const handleSubmit= (e)=>{
        e.preventDefault();

        fetch("http://localhost:5000/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(datas=>{
            console.log(data);
            if(datas.status==="success"){
                setError(false);
                console.log(user);
                login(data.email);
                navigate("/todo");
            }
            else{
                setData({firstname:"",lastname:"",email:"",password:""});
                refFirstName.current.value='';
                refLastName.current.value='';
                refEmail.current.value='';
                refPassword.current.value='';
                setError(true);  

            }
        })
    }

    return(
        <div className="login-box-container">
            <h1>Signup a new account</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col my-4">
                    <div className="flex flex-row space-x-4">
                        <div className="grow flex flex-col my-4">
                            <label htmlFor="firstname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">Your First Name</label>
                            <input ref={refFirstName} onChange={e=>{setData({...data,firstname:e.target.value})}} type="text" name="firstname" id="firstname" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="Enter your first name"/>
                        </div>

                        <div className="grow flex flex-col my-4">
                            <label htmlFor="lastname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">Your Last Name</label>
                            <input ref={refLastName}type="text" onChange={e=>{setData({...data,lastname:e.target.value})}} name="lastname" id="lastname" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="Enter your last name"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col my-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Email</label>
                    <input ref={refEmail} type="email" name="email" onChange={e=>{setData({...data,email:e.target.value})}} id="email" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="abc@email.com"/>
                </div>

                <div className="flex flex-col my-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Password</label>
                    <input ref={refPassword} type="password" onChange={e=>{setData({...data,password:e.target.value})}} name="password" id="password" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="***********"/>
                </div>
                {error?<h4 className="text-red-700 text-sm ">* Error while filling</h4>:<></>}
                <div className="flex flex-col my-5 items-center">
                    <button type="submit" className="login-button"> Sign up</button>
                    <div className="flex flex-row my-5">
                        <p className="cursor-default">Already have an account?</p>
                        <p className="text-blue-700 cursor-pointer" onClick={handleClick}>Sign In</p>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;