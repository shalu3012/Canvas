import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "./Navbar";
import Loading from "./utilities/Loading";
import axios from "axios";
import ErrorHandler from "./utilities/ErrorHandler";

function Home({setLoggedIn}) {
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState('')
  const navigate=useNavigate()
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setUser({
      ...user,
      [name]:value
    })
  }
  const login=async()=>{
    setLoading(true)
    const {email,password}=user;
    if(email&&password){
      await axios.post("http://localhost:5000/user",user)
      .then((res)=>{
        console.log(res)
        window.localStorage.setItem("user",JSON.stringify(res.data.user))
        window.localStorage.setItem('loggedIn',true)
        navigate("/canvas")
      })
      .catch((err)=>{
        setMessage((err.response.data.message))
      })
    }
    else{
      setMessage("Invalid username or password")
    }
    setLoading(false)
  }
  return (
    <>
    <Navbar setLoggedIn={setLoggedIn}/>
    <div className="home-container">
      <div className="login">
      {message?<ErrorHandler message={message}/>:''}
        {loading?<Loading/>: <form action="">
          <div className="form-field">
            <label htmlFor="email" className="form-label">
            <span className="icon">
                <FontAwesomeIcon icon="user" />
            </span>
              Email
            </label>
            <input name="email" type="email" className="form-input" onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="form-label">
                <span className="icon">
                <FontAwesomeIcon icon="lock" />
                </span>
              Password
            </label>
            <input name="password" type="password" className="form-input" onChange={handleChange}  />
          </div>
          <div className="btn" onClick={login}>Login</div>
        </form>}
       
      </div>
    </div>
    </>
  );
}

export default Home;
