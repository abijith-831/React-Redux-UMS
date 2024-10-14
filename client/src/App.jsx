import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AdminDashboard from './pages/Admin'
import ProtectedRoute from './components/User/ProtectedRoute'
import AdminProtectedRoute from './components/User/AdminProtectedRoute'



const App = () => {
  return (
    <Router>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false}  rtl={false}
      newestOnTop={false} pauseOnFocusLoss 
      closeOnClick pauseOnHover theme='light'/>
      <Routes>
        <Route path='/' element = {<ProtectedRoute><HomePage/></ProtectedRoute>}></Route>
        <Route path='/login' element={<LoginPage isAdminLogin={false}/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>

        <Route path='/admin/login' element={<LoginPage isAdminLogin={false} />} />
        <Route path='/admin/dashboard' element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App