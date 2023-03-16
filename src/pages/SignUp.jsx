import React from 'react';
import {  useState } from "react";
import {  useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';


function SignUp() {

  

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password_hash, setPassword] = useState('');
  const navigate = useNavigate()

  const formData = {
    username: username,
    email: email,
    password_hash: password_hash
  };
  const Signup = (e) => {
    e.preventDefault();
    // Submit the form data to your backend here
    fetch('http://localhost:3001/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // alert('signup succesful👌🤡')
        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

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
                <h1 className="h1">Welcome. We exist to make Visualization easier.</h1>
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
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" 
                      className="form-input w-full text-gray-300" 
                      placeholder="Password (at least 8 characters)" required
                      value={password_hash}
                      onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-500 text-center">
                    I agree to be contacted by Open PRO about this offer as per the Open PRO <Link to="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                                </div> */}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                      onClick={Signup}>Sign up</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Already have account? <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href='signin' >Sign in</a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

  

    </div>
  );
}

export default SignUp;