import React, { useState,useEffect } from 'react'

function ErrorHandler({message}) {
    const [showElement,setShowElement] =useState(true)
    useEffect(()=>{
      setTimeout(function() {
        setShowElement(false)
           }, 2000);
         },
     [])
        
    return(
      <div>
         {showElement? <div className="alert alert-danger alert-dismissible d-flex align-items-center">
    <strong className="error">Error!</strong>{message}
</div>:<></>} 
      </div>
    )
}

export default ErrorHandler