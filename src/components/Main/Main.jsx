import React, { use } from 'react'
import PropTypes from 'prop-types'
import style from "./Main.module.scss"
import AddForm from "../AddForm/AddForm"
import {FaRegPlusSquare} from "react-icons/fa"
import MCalendar from '../MCalendar/MCalendar'
import DCalendar from '../DCalendar/DCalendar'
import WCalendar from '../WCalendar/WCalendar'
import {Routes, Route} from "react-router"
import RegisterPage from '../Auth/RegisterPage'
import LoginPage from '../Auth/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../CalendarReducer'

function Main(props) {
  const modalState = useSelector((state) => state.calendars.modalState)
  const dispatch = useDispatch()
  let isAuthenticated = useSelector((state) => state.auth.token !== null)

  return (
    <div className={style.wrapper}>
      <Routes>
        <Route path='/' element={<MCalendar/>}/>
        <Route path='/week' element={<WCalendar/>}/>
        <Route path='/day' element={<DCalendar/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      {modalState && <AddForm/>}
      <button className={style.addButton}
      onClick={() => dispatch(openModal())}
      >
        <FaRegPlusSquare/>
      </button>
    </div>
  )
}

Main.propTypes = {}

export default Main
