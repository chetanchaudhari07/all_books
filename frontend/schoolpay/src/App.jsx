import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useSelector } from 'react-redux';
import OrderStatusPage from './pages/OrderStatusPage';
import WebhookForm from './pages/webHook';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const { user } = useSelector((s) => s.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="order-status/:orderId" element={<OrderStatusPage />} />
        <Route path="/webhook" element={<WebhookForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
