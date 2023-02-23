import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import PageIllustration from '../partials/PageIllustration';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SetPassword() {
  const { id, token } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [verified, setVerified] = useState(null);

  // decode the token back to its original form
  const decodedToken = Buffer.from(token, 'base64').toString();
  console.log(decodedToken)


  useEffect(() => {
    async function verifyResetToken() {
      try {
        const response = await axios.get(`http://localhost:3001/users/reset-password/${id}/${decodedToken}`);
        const { data } = response;
        setVerified(data.verified);
        setEmail(data.email);
        console.log(data.verified, data.email);
      } catch (error) {
        console.log(error);
        setVerified(false);
      }
    }
    verifyResetToken();
  }, [id, decodedToken]);
  

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmedPasswordChange(event) {
    setConfirmedPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmedPassword) {
      toast.error('Passwords do not match');
      return;
    }

    axios
      .post(`http://localhost:3001/users/reset-password/${id}/${decodedToken}`, { password })
      .then(() => {
        toast.success('Password updated successfully', {
          position: toast.POSITION.TOP_CENTER
        });
        
      })
      .catch((error) => {
        toast.error('Failed to update password');
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {verified === null && <p>Verifying reset token...</p>}
      <ToastContainer />
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        {verified === true && (
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1 mb-4">{email}</h1>
                  <p className="text-xl text-gray-400">Set new password.</p>
                  <p className="text-xl text-gray-400">This link is valid for only 2 minutes.</p>
                </div>
                <div className="max-w-sm mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <input
                          id="password"
                          type="password"
                          className="form-input w-full text-gray-300"
                          placeholder="password"
                          required={true}
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <input
                          id="confirm-password"
                          type="password"
                          className="form-input w-full text-gray-300 mt-4"
                          placeholder="confirm-password"
                          required={true}
                          value={confirmedPassword}
                          onChange={handleConfirmedPasswordChange}
                          />

                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mt-6">
                          <div className="w-full px-3">
                            <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                         >Reset Password</button>
                          </div>
                        </div>
                      </form>
                      <div className="text-gray-400 text-center mt-6">
                        <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Cancel</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section> )}
              {verified === false && <p>Reset token is not valid.</p>}
              
      
            </main>
      
            
          </div>
        );
      }
      
      export default SetPassword;