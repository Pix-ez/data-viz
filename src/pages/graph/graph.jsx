
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import axios from 'axios';
import Plot from 'react-plotly.js';

import "./graph.css"

const Graph = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [desc, setDesc] = useState([]);
  

  const [data, setData] = useState([]);
  const [selectedArray, setSelectedArray] = useState(null);
  const [options, setOptions] = useState([]);
  const [graphType, setGraphType] = useState('box');
  const [notes, setNotes] = useState('');

  useEffect(() => {
<<<<<<< HEAD
    // console.log(id);
    axios.get(`http://localhost:3001/graph/create/${id}`)
=======
    console.log(id);
    axios.get(`https://node-backend-mcjr.onrender.com/graph/create/${id}`)
>>>>>>> 365b77c00645143a09cd354f736085addb28fa70
      .then(res => {
        setData(res.data.data);
        setName(res.data.name)
        setDesc(res.data.desc)
        setNotes(res.data.note)
        console.log(res.data.note)
        let d = res.data.data;
        d = d.map(gettitle);
        function gettitle(item) {
          return item.YEAR;
        }
        setOptions(d);
      })
      .catch(err => console.log(err));
  },[]);

  const formData = {
    note: notes,
    name: name
  };
  const Save =()=>{
    // console.log(formData)
    axios.post('http://localhost:3001/file/save' , formData,{
      headers:{'Content-Type': 'application/json'},
    })
    .then(res=>{
      console.log(res.status)
    })
  }

  const handleArraySelection = (e) => {
    setSelectedArray(data[e.target.value]);
  };
    
  const handleGraphTypeSelection = (e) => {
    setGraphType(e.target.value);
  }

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  let specificArray = null;
  if (selectedArray) {
    specificArray = selectedArray;
  } else if (data.length > 0) {
    specificArray = data[0];
  }
  let keyValuePairs = [];
  let keys = [];
  let values = [];
  let xtitle = [];
  
  if (specificArray) {
    keyValuePairs = Object.entries(specificArray).slice(1);
    xtitle = Object.entries(specificArray);
    
    keys = keyValuePairs.map(([key]) => key);
    values = keyValuePairs.map(([, value]) => value);
  }

  return(
    <div className="flex grow justify-center flex-wrap items-center p-10 mt-8">
     <div className=" px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={() =>navigate("/main")} >Back</button>
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={() =>navigate("/")} >Home</button>
                    </div>
       
       <div className='info'>
           <h3>project - {name}</h3>
          <br/>
          <h5>description  - {desc}</h5>
        </div>
        <div className="ui">
          <a className=' h1 mb-2 text-purple-600'>Options</a>
          <div className="cont  mb-2 text-black">
            <select onChange={handleArraySelection}>
              {options.map((option, index) => (
                <option    value={index} key={index}>{option}</option>
              ))}
            </select>
            <select onChange={handleGraphTypeSelection}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
            </select>
          </div>
        </div>
        <div className="graph">
          
          <Plot
            data={[
              {
                x: keys,
                y: values,
                              type: graphType, // use the selected graph type
              // mode: 'lines+markers',
              // marker: { color: 'red' },
            },
          ]}
          layout={{
            title: 'Key-Value Plot',
            xaxis: { title:  "" + xtitle[0], tickcolor: "red" },
            yaxis: { autorange: 'true' , title: "temperature" },
          }}
        />
        
      </div>
      <div className='ml-4 mb-2 text-white'>
      <label  className=' text-white'>Take notes</label>
        <textarea  className='text-black' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-100" onClick={Save} >Save</button>

        
      </div>
    
    </div>
)
};


export default Graph;

