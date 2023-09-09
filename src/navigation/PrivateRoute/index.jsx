

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../../dashboard/AdminDashboard/AdminDashboard'
import {SignIn,Login} from "../../dashboard/AdminDashboard/Pages/index"
import AdminPrivateRoute from './AdminPrivateRoute'
import Home from '../../pages/Home/Home'
import UserLogin from '../../pages/Home/UserLogin'
import UserSignin from '../../pages/Home/UserSignin'

const RootNavigation = () => {
  return (
    <Routes>
        <Route path='/admin_panel' element={<AdminPrivateRoute><AdminDashboard/></AdminPrivateRoute>}/>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignin" element={<UserSignin />} />
        


       
        

    </Routes>
  )
}

export default RootNavigation