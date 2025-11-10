import React, { useState } from 'react';
import DashboardChart from './components/Chart';
import InputForm from './components/InputForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleDataSubmit = () => setRefreshKey(prev => prev + 1);

  return (
    <div className='container'>
      <header><h1>AIS 6 Requirements</h1></header>
      <div className='main'>
        <div className='sub-dashboard'>
          <InputForm onDataSubmit={handleDataSubmit} />
        </div>
        <div className='dashboard'>
          <DashboardChart refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default App;