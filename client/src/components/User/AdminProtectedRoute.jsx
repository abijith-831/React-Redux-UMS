import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AdminProtectedRoute = ({children}) => {
    const { currentUser } = useSelector((state)=>state.user)

    if (!currentUser) {
        return <Navigate to="/admin" replace />;
    }
    
    if (!currentUser.isAdmin) {
        return <Navigate to="/" replace />;
    }
  return children
}

export default AdminProtectedRoute
