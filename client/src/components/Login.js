import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    });

    const handleLogin= async ()=>{
        // console.log(username,password)
        let result = await fetch("http://localhost:5000/api/login",{
            method:"post",
            body:JSON.stringify({username,password}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();

        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/")
        }

        else{
            alert("please enter correct details")
        }
    }

  return (
    <div className='register'>
        <h1>Login</h1>
        <input type="text" placeholder="Enter Username" className='inputBox' onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder="Enter Password" className='inputBox' onChange={e=>setPassword(e.target.value)}/>
        <button type='button' className='appButton' onClick={handleLogin}>Login</button>
        <hr/>
        <Link to={"/register"}>New user? click here to Register.</Link>
    </div>
  )
}

export default Login