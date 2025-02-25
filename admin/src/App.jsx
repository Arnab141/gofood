import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from './assets/admin_assets/assets.js'

function App() {
  // const url = "https://gofood-vg1g.onrender.com";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element ={<Add url={url}/>}/>
          <Route path="/list" element ={<List url={url}/>}/>
          <Route path="/orders" element ={<Orders url={url}/>}/>
        </Routes>
        
      </div>
    </div>
  )
}

export default App
