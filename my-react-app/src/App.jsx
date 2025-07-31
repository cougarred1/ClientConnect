import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    notes: "",
    followUpDate: ""
  });
  const [submittedData, setSubmittedData] = useState({
    name: "",
    email: "",
    number: "",
    notes: "",
    followUpDate: ""
  });

  const handleInputValue = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name] : value
    })
  
  }

  const dataSubmitted = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/api/clients", formData)
    .then((res) => {
      console.log("Client successfully created:", res.data);
    })
    .catch((error) => {
      console.log("Error adding client:", error);
    })

    setSubmittedData({ ...formData })
    setFormData({
      name: "",
      email: "",
      number: "",
      notes: "",
      followUpDate: ""
    })


  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/clients")
  .then(res => {
    console.log("backend response", res.data, Array.isArray(res.data));
    setClients(res.data);
  })
  .catch(error => {
    console.error("Error retrieving clients", error);
  })
  }, []);

  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <form>
          <input name="name" value={formData.name} onChange={handleInputValue} placeholder='Name'/> 
          <input name="email" value={formData.email} onChange={handleInputValue} placeholder='Email'/>
          <input name="number" value={formData.number} onChange={handleInputValue} placeholder='Phone Number'/>
          <input name="notes" value={formData.notes} onChange={handleInputValue} placeholder='Notes'/>
          <input name="followUpDate" value={formData.followUpDate} onChange={handleInputValue} placeholder='FollowUp Date'/>
          <button type="submit" onClick={dataSubmitted}>Submit</button>
        </form>
      </div>
      <div>
        <li>{submittedData.name}</li>
        {submittedData.email}<br/>
        {submittedData.number}<br/>
        {submittedData.notes}<br/>
        {submittedData.followUpDate}<br/>
      </div>
    </>
  )
}

export default App
