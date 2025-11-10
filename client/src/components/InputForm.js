import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ onDataSubmit }) {
  const [data, setData] = useState({sales:'', purchases:'', expenses:'', profit:'', profitMargin:'', explanation:''});
  const handleChange = e => setData({...data, [e.target.name]: e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/finance', data);
    setData({sales:'', purchases:'', expenses:'', profit:'', profitMargin:'', explanation:''});
    if(onDataSubmit) onDataSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {['sales','purchases','expenses','profit','profitMargin'].map(f=>(
        <div key={f}><label>{f}</label><input type='number' name={f} value={data[f]} onChange={handleChange} required/></div>
      ))}
      <div><label>Explanation</label><textarea name='explanation' value={data.explanation} onChange={handleChange} rows='4'/></div>
      <button type='submit'>Save Data</button>
    </form>
  );
}