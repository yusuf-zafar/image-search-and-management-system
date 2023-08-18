import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  return (
    <div className="container">
      <div className="logdiv">
        <span>
          logged in as:{" "}
          <b>
            <em>{JSON.parse(auth).username} </em>
          </b>
        </span>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <div className="container">
        <div className="header">
          <h1>Image Search and Management</h1>
        </div>
        <div className="links">
          <Link to="/search">Search Images</Link>
          <Link to="/upload">Upload Image</Link>
        </div>
        {/* <hr /> */}
      </div>
    </div>
  );
}

export default Home;
