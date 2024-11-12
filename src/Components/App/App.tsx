import './App.css'
import MainPage from '../MainPage/MainPage'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegistrationForm from '../RegisterForm/RegisterForm'
import Navbar  from '../NavBar/NavBar'
import LoginForm from '../LoginForm/LoginForm'
import UserProvider from '../../Contexts/Context'

//flag for react-router-dom 6.28
//<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

function App() {

  return (
    <UserProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }} >
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/home' element={<MainPage />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/login' element={<LoginForm/>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
