import Navbar from './components/Navbar';
import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 Navigate
} from "react-router-dom";
import Home from './components/Home';
import "./components/FontAwesomeIcons"
import Register from './components/Register';
import Canvas from './components/Canvas';

function App() {
  const loggedIn=window.localStorage.getItem('loggedIn');
  const user=window.localStorage.getItem('loggedIn');
  console.log(loggedIn)
  return (
    <div className="App">
      <Routes>
          <Route exact path="/"  element={loggedIn&&user?<Canvas/>:<Home/>}/>
          {/* <Route path="/" element={loggedIn===true&&<Navigate replace to="/canvas"/>} /> */}
          <Route path="/register"  element={<Register/>}/>
          <Route path="/canvas"  element={<Canvas/>}/>
        </Routes>
    </div>
  );
}

export default App;
