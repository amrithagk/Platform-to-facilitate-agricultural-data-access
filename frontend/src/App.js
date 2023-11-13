import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import Fertilizers from './pages/fertilizers';
import Crops from './pages/crops';
import FarmerDashboard from './pages/farmerdashboard';
import Incentives from './pages/incentives';

function App() {
  return (
    <div className="App">
      <h1>Platform to facilitate agricultural data access</h1>
      <Navigation/>
        <Routes>
          <Route path="/fertilizers" element={<Fertilizers />}></Route>
          <Route path="/crops" element={<Crops />}></Route>
          <Route path="/dashboard" element={<FarmerDashboard />}></Route>
          <Route path="/incentives" element={<Incentives />}></Route>
        </Routes>
    </div>
  );
}

export default App;
