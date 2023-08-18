import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import ImageDetail from "./components/ImageDetail";
import UploadForm from "./components/UploadForm";
import PrivateComponent from "./components/PrivateComponent";
import Register from './components/Register';
import Login from './components/Login';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/image/:id" element={<ImageDetail />} />
            <Route path="/upload" element={<UploadForm />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
