import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteProfesional from './components/ProtectedRouteProfesional';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import LoginProfesional from './components/LoginProfesional';
import RegisterProfesional from './components/RegisterProfesional';
import Dashboard from './components/Dashboard';
import DashboardProfesional from './components/DashboardProfesional';
import PetProfile from './components/PetProfile';
import PetProfilePublic from './components/PetProfilePublic';
import VetDashboard from './components/VetDashboard';
import GroomerDashboard from './components/GroomerDashboard';
import UserSettings from './components/UserSettings';
import About from './components/Home/About';

function App() {
  return (
    <Router> 
      <Routes>
        {/* Rutas completamente públicas - fuera del AuthProvider */}
        <Route path="/pet/:id" element={<PetProfilePublic />} />
        
        {/* Rutas que requieren AuthProvider */}
        <Route path="/*" element={
          <AuthProvider>
            <Routes>
              {/* Rutas públicas dentro del contexto de auth */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login-profesional" element={<LoginProfesional />} />
              <Route path="/register-profesional" element={<RegisterProfesional />} />
              <Route path="/about" element={<About />} />
              
              {/* Rutas protegidas */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboardProfesional" element={
                <ProtectedRouteProfesional>
                  <DashboardProfesional />
                </ProtectedRouteProfesional>
              } />
              <Route path="/pet-profile/:id" element={
                <ProtectedRoute>
                  <PetProfile />
                </ProtectedRoute>
              } />
              <Route path="/vet" element={
                <ProtectedRoute>
                  <VetDashboard />
                </ProtectedRoute>
              } />
              <Route path="/groomer" element={
                <ProtectedRoute>
                  <GroomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;
