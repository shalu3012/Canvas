import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import Loading from "./utilities/Loading"
import Navbar from "./Navbar";
import ErrorHandler from "./utilities/ErrorHandler";

function Register({setLoggedIn}) {
const [message,setMessage]=useState('')
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const [user,setUser]=useState({
    name:"",
    username:"",
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUser({
      ...user,
      [name]:value
    })
  }
  const register =async () => {
    setLoading(true)
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      await axios.post('http://localhost:5000/user/signup',user)
      .then(res=>{
        if(res.data.user){
          window.localStorage.setItem('user',JSON.stringify(res.data.user))
        window.localStorage.setItem('loggedIn',true)
        navigate('/canvas')
        alert(res.data.message)
        setLoading(false)
    }
  })
  .catch((err)=>{
    setLoading(false)
    setMessage(err.response.data.message)
  })
  };
  
  return (
    <>
    <Navbar/>
    <div className="register-container">
      <div className="register">
        {message?<ErrorHandler message={message}/>:''}
        {loading?<Loading/>:
        <form action="">
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="name" name="name" className="form-input" onChange={handleChange}/>
          </div>
          <div className="form-field">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="username" name="username" className="form-input" onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" name="email" className="form-input" onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password"className="form-label">
              Password
            </label>
            <input type="password" name="password" className="form-input" onChange={handleChange} />
          </div>
          <div className="btn" onClick={register}>Sign up</div>
        </form>
  
        }
    </div>
    </div>
    </>
  );
}

export default Register;
