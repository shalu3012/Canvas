import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import Loading from "./utilities/Loading";

function Navbar({setLoggedIn}) {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false)
  const user=JSON.parse(window.localStorage.getItem("user"))

  const logOut=()=>{
      window.localStorage.removeItem('user')
      alert('Are you sure you wanna logout ?')
      window.localStorage.removeItem('loggedIn')
      window.location.reload()
      navigate('/')
  }
  return (
    <div className="navbar">
      <>
      <div className="nav-name"  onClick={()=>navigate('/')}>Canvas</div>
      <div className="nav-items">
        <ul className="nav">
          {user?<>
           <li className="nav-item" onClick={logOut}>Logout</li>
           <div className="user"> {user.name[0].toUpperCase()}</div>
           </>:
          <>
           <li className="nav-item" onClick={()=>navigate('/register')}> Register</li>
           <li className="nav-item"  onClick={()=>navigate('/')}>Login</li>
           </>
          }
         
        </ul>
      </div>
      </>
    </div>
  );
}

export default Navbar;
