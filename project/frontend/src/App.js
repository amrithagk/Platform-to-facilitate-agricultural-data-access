// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginSignUp from './pages/LoginSignUp';
import ProfileButton from './components/profileButton'; // Import the new component
import Crops from "./pages/crops";
import Pesticide from './pages/pesticide';
import DealerDashboard from './pages/DealerDashboard';
import InitiateDealPage from './pages/initiate_page';
import OrdersPage from './pages/orderspage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path = "/crops" element = {<Crops/>}/>
          <Route path = "/pesticide" element = {<Pesticide/>}/>
          <Route path = '/dealer_dashboard' element = {<DealerDashboard/>}/>
          <Route path = '/dealer_dashboard/initiate-deal' element = {<InitiateDealPage/>}/>
          <Route path = '/dealer_dashboard/orders' element = {<OrdersPage/>}/>

        </Routes>

        {/* Include the ProfileButton component */}
     
      </div>
    </Router>
  );
}

export default App;
