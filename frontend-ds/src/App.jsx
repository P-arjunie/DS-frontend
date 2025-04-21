import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DriverRegisterForm from './driver/DriverRegisterForm'
import DriverLoginForm from './driver/DriverLoginForm'
import DriverDashboard from './driver/DriverDashboard'
import TrackingMap from './components/TrackingMap'

import CustomerLoginForm from './customer/CustomerLoginForm'
import CustomerRegisterForm from './customer/CustomerRegisterForm'

import DriverProfile from './driver/DriverProfile'




import RestaurantRegister from './restaurant/RestaurantRegister'



function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/register-driver" element={<DriverRegisterForm />} />
        <Route path="/login-driver" element={<DriverLoginForm />} />
        <Route path="/dashboard" element={<DriverDashboard />} />
        <Route path="/trackingMap" element={<TrackingMap />} />
        <Route path="/profile" element={<DriverProfile />} />




        {/* Route for customer */}
        <Route path="/customer-login" element={<CustomerLoginForm />} />
        <Route path="/customer-register" element={<CustomerRegisterForm />} />



        <Route path="/register-restaurant" element={<RestaurantRegister />} />



      </Routes>
    </Router>
  )
}

export default App
