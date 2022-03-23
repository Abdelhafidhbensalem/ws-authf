import { USER_SIGNUP_LOADING, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, GET_CURRENT_USER_FAIL, GET_CURRENT_USER_SUCCESS, LOGOUT_USER } from "../Actionstypes/constantsUser"
import axios from "axios"

export const registerUser = (newUser, navigate) => async dispatch => {
    dispatch({ type: USER_SIGNUP_LOADING })
    try {
        const response = await axios.post("http://localhost:5000/user/register", newUser)
        console.log(response);
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: response.data })
        navigate("/signin")
    } catch (error) {
        console.dir("error", error)
        dispatch({ type: USER_SIGNUP_FAIL, payload: error })
    }
}

export const loginUser = (loggedUser, navigate) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:5000/user/login", loggedUser)
        console.log(response);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data })
        if (response.data.user.role == "admin") { navigate("/") }
        else {
            navigate("/")
        }
    } catch (error) {
        console.dir(error)
        dispatch({ type: USER_SIGNIN_FAIL, payload: error })
    }
}

export const getCurrentUser = () => async dispatch => {
    try {
        const opts = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        const response = await axios.get("http://localhost:5000/user/current", opts)
        dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: response.data.user })
    } catch (error) {
        console.dir(error)
        dispatch({ type: GET_CURRENT_USER_FAIL, payload: error })
    }
}

export const logoutUser = () => {
    return { type: LOGOUT_USER }
}