// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginSignUp from './pages/LoginSignUp';
import ProfileButton from './components/profileButton'; // Import the new component
import Crops from "./pages/crops";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path = "/crops" element = {<Crops/>}/>
        </Routes>

        {/* Include the ProfileButton component */}
        {localStorage.getItem('Email') && (<ProfileButton />)}
      </div>
    </Router>
  );
}

export default App;
