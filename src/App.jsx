import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css'
import Profile from './components/Profile'
import Home from './components/Home'
import CreateQuote from './components/CreateQuote'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import OtherUserProfile from './components/OtherUserProfile'
import NotFound from './components/NotFound'
function App() {

  return (
    <>
    {/* <Login></Login> */}
    {/* <Signup></Signup> */}
    {/* <Profile></Profile> */}
    {/* <CreateQuote></CreateQuote> */}
    {/* <Home></Home> */}
    <Navbar></Navbar>
<Routes>
  <Route path='/' element={<Home></Home>}></Route>
  <Route path='/login' element={<Login></Login>}></Route>
  <Route path='/signup' element={<Signup></Signup>}></Route>
  <Route path='/profile' element={<Profile></Profile>}></Route>
  <Route path='/profile/:userId' element={<OtherUserProfile></OtherUserProfile>}></Route>
  <Route path='/create-quote' element={<CreateQuote></CreateQuote>}></Route>
  <Route path='*' element={<NotFound></NotFound>}></Route>
</Routes>
       
    </>
  )
}

export default App
