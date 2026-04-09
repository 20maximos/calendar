import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import style from './Auth.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from './AuthReducer'
import { useNavigate } from 'react-router'

function LoginPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, token } = useSelector((state) => state.auth)

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(clearError)
        }
        if (token) {
            navigate("/")
        }
    }, [error, token])
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()

    let onSubmit = (data) => {
        dispatch(loginUser(data))
    }
    return (
        <div className={style.wrapper}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id='email'
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Login must contain only letters and numbers"
                        }
                    })}
                />
                <span>{errors.email?.message}</span>
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 3,
                            message: "Password must contain at least 3 characters"
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must contain less than 20 characters"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Password must contain only letters and numbers"
                        }
                    })}
                />
                <span>{errors.password?.message}</span>
                <br />
                <button className={style.button}>Login</button>
            </form>
        </div>
    )
}

LoginPage.propTypes = {}

export default LoginPage
