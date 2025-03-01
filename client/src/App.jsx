import React from 'react'
import Home from './pages/Home'
import {ToastContainer} from 'react-toastify'
import {  Routes, Route, BrowserRouter,  } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AllComplaints from './pages/AllComplaints';
import SingleComplaints from './pages/SingleComplaints';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RaiseComplaint from './pages/RaiseComplaint';
import PrivateComponent from './components/PrivateComponent';
import AllUsers from './pages/AllUsers';
import AllComments from './pages/AllComments';


const App = () => {
  return(
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<PrivateComponent/>} >
        <Route path='' element={<Home/>}/>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/users' element={<AllUsers/>}/>
        <Route path='admin/comments' element={<AllComments/>}/>
        <Route path='raise-complaint' element={<RaiseComplaint/>}/>
        <Route path='complaints' element={<AllComplaints/>}/>
        <Route path='complaints/:id' element={<SingleComplaints/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <ToastContainer/>
      <Footer/>
    </BrowserRouter>
  )
  
}

export default App
