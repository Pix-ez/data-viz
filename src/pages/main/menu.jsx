import React from "react";
import './menu.css'


import { useState, useEffect } from "react";
import axios from "axios";
import {MdDeleteForever} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';




const Menu = () => {

  const navigate = useNavigate();
  const [projectname, setProjectname] = useState("");
  const [description, setDescription] = useState("");
  const[pnames , setPnames] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const [file, setFile] = useState(null);
  const [name, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  
  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      axios.get(`https://node-backend-mcjr.onrender.com/project/get_name/${user_id}`)
        .then(res => {
          const projectData = res.data.project;
          if (Array.isArray(projectData)) {
            let names = [];
            projectData.forEach(obj => {
              names.push({id: obj.id, name: obj.name, desc: obj.description});
            });
            console.log(names);
            setPnames(names)
          } else {
            console.error("projectData is not an array:", projectData);
          }
        })
        .catch(err => {
          console.log(err);
        });

        setIsCreated(false)
    }
  },[isCreated]);
  
  const Send = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }
  
    const data = new FormData();
    data.append('name', name);
    data.append('file', file);
    data.append('pname', projectname);
    data.append('uid', localStorage.getItem('user_id'))
  
    try {
      const response = await axios.post('https://node-backend-mcjr.onrender.com/file/upload', data);
      if (response.data.msg === 'ok') {
        toast.success('File uploaded successfully');
      } else {
        // handle error
      }
    } catch (err) {
      // handle error
      console.log(err);
    }
  };
  
  const Submit = async () => {
    const formdata = {
      name: projectname,
      desc: description,
      
      id: localStorage.getItem('user_id')
    };
  
    localStorage.setItem('projectName', projectname);
    localStorage.setItem('projectDesc', description)
  
    try {
      const response = await axios.post("https://node-backend-mcjr.onrender.com/project/newpr", formdata, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data.msg === true) {
        toast.success("project created");
        setIsCreated(true);
      }
    } catch (err) {
      // handle error
      console.log(err);
    }
  };
  

 
  const Delete = (id) =>{
      axios.delete(`https://node-backend-mcjr.onrender.com/project/delete_project/${id}`)
        .then(res => {
          console.log(res.data);
          if (res.data.msg === true) {
            toast.warning("project deleted");
            setPnames(pnames.filter(p => p.id !== id))
          }
        })
        .catch(err => {
          console.log(err);
        });
  }

  async function handleButtonClick() {
    setIsLoading(true);

    try {
      await Submit();
      const response = await Send();
      if (response.msg === "ok") {
        toast('File success')
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  }
  

 

  return (
  

    
    <div className="Menu">
      <ToastContainer />
      <div className=" px-3">
                      
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={() =>navigate("/")} >Home</button>
                    </div>
     
      <div className="option">
        <a  className="h1 mb-2 text-white ml-10 mt-4" data-aos="fade-up" >Projects-</a>
        <div className="cont">
          <ul>
      
            {pnames.map(({id, name}) => (
                            <li key={id} className="op">
                              <a className="text-xl text-gray-400" >{name} </a>
                              
                              
                              {/* <button onClick={()=> navigate('/graph', { replace: true })} >OPEN</button> */}
                              <a  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                               data-aos="fade-up" data-aos-delay="300"  
                               onClick={() =>
                                navigate("/graph", {
                                  state: { id: id},
                                })
                              }>Open</a>

                              <a  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3 " data-aos="fade-up" data-aos-delay="300"
                              onClick={() => Delete(id)}><MdDeleteForever /></a>
                              
                        
                            </li>
                            
            ))}
            
          </ul>
          </div>
        </div>
        <div className="project">
          <div className="newpr">
          <h1 className="h1 mb-4" data-aos="fade-up">
              Data Analysis Service
            </h1>
       
              <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Project Name</label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="Project Name"
                      onChange={(e) => setProjectname(e.target.value)}/>
                    </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Description</label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}/>
                    </div>

              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" 
                      onClick={() => setShowModal(true)}>Upload</button>
                      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} contentLabel="Upload file modal" className="Modal" overlayClassName="Overlay">
                      <form className='form'>
                      <button className="upload bg-purple-600 hover:bg-purple-700 mr-3"  onClick={() => setShowModal(false)}>back</button>
                      <label>Click here to upload files.😎👇</label>
                      <input className='input' type="file" accept='.csv' 
                      onChange={event => {
                      const {value} = event.target;
                      setFileName(value);
                      const file = event.target.files[0];
                      setFile(file);
                      }}
                      />
                      {/* <button className="upload bg-purple-600 hover:bg-purple-700" type="submit" onClick={Send} disabled={!file}>Upload</button> */}
                      </form>
                      </Modal>
                    </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" 
                      onClick={handleButtonClick}  disabled={isLoading} >Create{isLoading ? "Sending..." : "Create"}
                      </button>
                      {isLoading && <div className="loading-animation">Loading...</div>}
                    </div>
              </div>
          </div>
        </div>
        
    </div>


      
    );
  };
  
  export default Menu;
  
