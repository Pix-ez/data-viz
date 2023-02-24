import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

import { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginstatus] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);

  const formData = {
    email: email,
    password_hash: password
  };

  axios.defaults.withCredentials = true;


useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError('Please enter a valid email');
      toast.error('Please enter a valid email');
    } else {
      setEmailError('');
    }
  
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      toast.error('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  
    if (formValid && emailError === '' && passwordError === '') {
      axios.post('https://node-backend-mcjr.onrender.com/users/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if(!response.data.auth){
            setLoginstatus(false)
            console.log(response.data.message);
            
          }else{
            console.log(response.data)
  
            const name = response.data.result[0].username;
            const user = response.data.result[0];
            const email = response.data.result[0].email;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loggedIn', true);
            setLoginstatus(true);
  
            toast.success(`Login successful, hello ${name}`);
            navigate('/');
          }
  
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const Login = () => {
    console.log("button is presed")
    
    
    axios.post('https://node-backend-mcjr.onrender.com/users/login', formData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if(!response.data.auth){
          setLoginstatus(false)
          console.log(response.data.message);
        }else{
          console.log(response.data.result[0].id)
       
        const name = response.data.result[0].username;
        const user = response.data.result[0];
        const email = response.data.result[0].email;
        const id = response.data.result[0].id
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', id);
        localStorage.setItem('loggedIn', true);
        
        setLoginstatus(true);

        alert(`Login successful, hello ${name}`);
        navigate('/');
       

        }
        
      })
      .catch((error) => {
        console.error(error);
        
      });
  };


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ToastContainer />


      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                {/* <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-400">Or, sign in with your email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div> */}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="abc@hello.com"
                       required value={email} onChange={(e) => setEmail(e.target.value)} />
                      {emailError && <span className="error">{emailError}</span>}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      <input id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 8 characters)" required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                      {passwordError && <span className="error">{passwordError}</span>}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">Keep me signed in</span>
                        </label>
                        <Link to="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" >Log in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* <Banner /> */}

    </div>
  );
}

export default SignIn;
