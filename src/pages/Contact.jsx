import React from 'react';
import {  useState } from "react";
import { Link , useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PageIllustration from '../partials/PageIllustration';


function Contact() {

  

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const formData = {
    username: username,
    email: email,
    message: message
  };
  const Submit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend here
    fetch('http://localhost:3001/users/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success(data.msg)
        // alert('signup succesful👌🤡')
        // navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

    
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
                <h1 className="h1">Contact Form .</h1>
                <h5 className="h5">Write about your compiants and experience.</h5>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
               
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                      <input id="full-name" type="text"
                       className="form-input w-full text-gray-300" 
                       placeholder="First and last name" required 
                       value={username}
                      onChange={(e) => setName(e.target.value)}/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Company Name <span className="text-red-600">*</span></label>
                      <input id="company-name" type="text"
                       className="form-input w-full text-gray-300" 
                       placeholder="Your company or app name" required
                        />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Work Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email"
                       className="form-input w-full text-gray-300"
                        placeholder="abc@hello.com" required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" >Message <span className="text-red-600">*</span></label>
                      <input id="message" type="text" 
                      className="form-input w-full text-gray-300" 
                      placeholder="write your message/feedback" required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)} />
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-500 text-center">
                    I agree to be contacted by Open PRO about this offer as per the Open PRO <Link to="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                                </div> */}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={Submit}
                      >Submit</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Go Back  <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href='/' > ⬅️ </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

  

    </div>
  );
}

export default Contact;