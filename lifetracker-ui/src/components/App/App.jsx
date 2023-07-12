import * as React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from '../Register/register'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Login from '../Login/Login'
import NutritionPage from '../NutritionPage/NutritionPage'

import './App.css'
import { useState, useEffect } from 'react'
import ExercisePage from '../ExercisePage/ExercisePage'
import SleepPage from '../SleepPage/SleepPage'
import ActivityPage from '../ActivityPage/ActivityPage'






function App() {

const [appState, setAppState] = useState({})
const [token, setToken] = useState({})
const [isLogged, setIsLogged] = useState(false)



useEffect ( function checkLocalStorageForTokens () {
    const localStorageCheck = localStorage.getItem("token")

    if(localStorageCheck)
    {
      setIsLogged(true)
    }

}) 





const handleLogout = () => {
  localStorage.removeItem("token")
  setIsLogged(false)
}

  
  return (
    <>
    <BrowserRouter>

        

        <Navbar handleLogout={handleLogout} isLogged={isLogged}/> 



    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login setAppState={setAppState} setToken={setToken} setIsLogged={setIsLogged} />}/>
      <Route path='/register' element={<Register setAppState={setAppState} />}/>
      <Route path='/activity' element={ <ActivityPage/>}/>
      <Route path='/nutrition' element={<NutritionPage/>}/>
      <Route path='/exercise' element= {<ExercisePage/>}/>
      <Route path='/sleep' element={<SleepPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
