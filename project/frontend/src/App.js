import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import Fertilizers from './pages/fertilizers';
import Crops from './pages/crops';
import FarmerDashboard from './pages/farmerdashboard';
import Incentives from './pages/incentives';
import Warehouse from './pages/warehouse';
import Home from './pages/Home';
import LoginSignUp from './pages/LoginSignUp';
import ProfileButton from './components/profileButton'; // Import the new component
import Pesticide from './pages/pesticide';
import DealerDashboard from './pages/DealerDashboard';
import InitiateDealPage from './pages/initiate_page';
import OrdersPage from './pages/orderspage';


function App() {
  return (
      <div className="App">
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path = "/crops" element = {<Crops/>}/>
          <Route path = "/pesticide" element = {<Pesticide/>}/>
          <Route path = '/dealer_dashboard' element = {<DealerDashboard/>}/>
          <Route path = '/dealer_dashboard/initiate-deal' element = {<InitiateDealPage/>}/>
          <Route path = '/dealer_dashboard/orders' element = {<OrdersPage/>}/>
          <Route path="/fertilizers" element={<Fertilizers />}></Route>
          <Route path="/farmer_dashboard" element={<FarmerDashboard />}></Route>
          <Route path="/incentives" element={<Incentives />}></Route>
          <Route path="/warehouse" element={<Warehouse />}></Route>
        </Routes>

        {/* Include the ProfileButton component */}
     
      </div>
  );
}

export default App;
