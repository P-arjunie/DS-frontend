import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DriverRegisterForm from './driver/DriverRegisterForm'
import DriverLoginForm from './driver/DriverLoginForm'
import DriverDashboard from './driver/DriverDashboard'
import TrackingMap from './components/TrackingMap'


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/register-driver" element={<DriverRegisterForm />} />
        <Route path="/login-driver" element={<DriverLoginForm />} />
        <Route path="/dashboard" element={<DriverDashboard />} />
        <Route path="/trackingMap" element={<TrackingMap />} />







      </Routes>
    </Router>
  )
}

export default App
