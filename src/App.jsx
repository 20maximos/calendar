import { useState, useEffect } from 'react'
import "./styles/generalStyle.scss"
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import StoreProvider from './store/ContextStore'
import { BrowserRouter } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { uploadTokenFromLocalStorage } from './components/Auth/AuthReducer'
import { getEvents } from './components/CalendarReducer'

function App() {
  const dispatch = useDispatch()
  dispatch(uploadTokenFromLocalStorage())

  let token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if(token) dispatch(getEvents())
  }, [token])
  
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}

export default App
