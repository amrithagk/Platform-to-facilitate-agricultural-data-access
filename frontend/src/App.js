import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fertilizers from './pages/fertilizers';
import Navigation from './navigation';

function App() {
  return (
    <div className="App">
      <h1>Platform to facilitate agricultural data access</h1>
      <Navigation/>
        <Routes>
          <Route path="/fertilizers" element={<Fertilizers />}></Route>
        </Routes>
    </div>
  );
}

export default App;
