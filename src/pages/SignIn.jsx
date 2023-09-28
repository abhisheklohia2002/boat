import React, { useRef,useState } from 'react'
import { Header } from '../components/Header'

export default function SignIn() {

    const email = useRef(null);
    const password = useRef(null);
    const [errorMessage,seterrorMessage] = useState(null)
      const [isSignInForm, setisSignInForm] = useState(true);
      const ToggleSignForm = () => {
        setisSignInForm(!isSignInForm);
      };
    
    const HandleButtonClick = (event)=>{
    event.preventDefault()
       
    //    let checkValidInfoData =  CheckValidateData(email.current.value,password.current.value);
    let checkValidInfoData = ""
    seterrorMessage(checkValidInfoData);
    
    if(CheckValidateData) return;
    
    
    if(!isSignInForm){
    
    
    }
    else {
     
    
    }
    
    
    
    }
    

  return (
<>
<Header/>
<div className='absolute pt-5'>
    <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/About_us_banner.png?v=1620112113" alt="" />
</div>

<form
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75"
        action="
"
      >
        <h1 className="font-bold text-3xl py-4">{  isSignInForm ? "Sign In":"Sign Up"}</h1>


        {!isSignInForm&&(<input
          type="text"
          placeholder="Full Name"
          className="p-2 my-2 w-full bg-gray-800"
          name=""
          id=""
        />)}


        <input
        ref={email}
        
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-800"
          name=""
          id=""
        />



        <input
        ref = {password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-800"
          name=""
          id=""
        />
        <p
        className="text-red-500 font-bold text-lg py-4"
        >
          {errorMessage}  
        </p>
        <button onClick={HandleButtonClick} className="p-2 my-4 bg-red-700 w-full">{  isSignInForm ? "Sign In":"Sign Up"}</button>
        <p className="py-6 cursor-pointer" onClick={ToggleSignForm}>
          {isSignInForm?"New to boAt? Sign Up New":"Already Registered?"}
        </p>
      </form>

</> )
}
