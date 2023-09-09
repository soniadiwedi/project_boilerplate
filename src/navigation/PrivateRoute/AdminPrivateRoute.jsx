import React from 'react'
import { useAdminAuth } from '../../context/AdminAuthContextProvider'
import { Navigate } from 'react-router-dom'

const AdminPrivateRoute = ({children}) => {
    const {admin}=useAdminAuth()
    if(!admin){
        return <Navigate to="/login"/>
    }
  return (
    children
  )
}

export default AdminPrivateRoute