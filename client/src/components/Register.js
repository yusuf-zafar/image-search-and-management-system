import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"

const Register = () => {
  const [contactForm, setContactForm] = useState({
    username: "",
    password: "",
  });

  const handleForm = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    try{
    let result = await fetch("http://localhost:5000/api/register", {
      method: "post",
      body: JSON.stringify({ ...contactForm }),
      headers: { "Content-Type": "application/json" },
    });

    if (!result.ok) {
        const errorResponse = await result.json();
        throw new Error(errorResponse.error);
      }

    result = await result.json();
    // console.warn(result);
    // localStorage.setItem("user",JSON.stringify(result))

    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
}catch(error){
alert(error.message)
}
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Username"
        name="username"
        value={contactForm.username}
        onChange={handleForm}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        name="password"
        value={contactForm.password}
        onChange={handleForm}
      />
      <button onClick={collectData} className="appButton">
        Sign Up
      </button>
      <hr/>
        <Link to={"/login"}>Existing user? click here to Login.</Link>
    </div>
  );
};

export default Register;
