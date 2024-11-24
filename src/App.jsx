import "./App.css";
import HomePage from "../src/Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Components/Login/Login";
import Register from "../src/Components/Register/Register";
import NavBar from "../src/Components/NavBar/NavBar";
import SongList from "./Components/SongList/SongList"
// import { useState } from "react";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/songlist" element={<SongList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;