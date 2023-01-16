import { REGISTER_USER, LOGIN_USER } from "./authTypes";
import { toast } from "react-toastify";
import { ENV } from "./../../config/config";
import { apiHelper } from "../apiHelper";

export const RegisterUser = (user) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/auth/register`, user)
    if (res?.data) {
      let { data } = res
      ENV.removeItem("code")
      ENV.encryptUserData(data)
      
      dispatch({
        type: REGISTER_USER,
        payload: data
      })
      window.location.href = `/login?status=200&resend=${user.email}&message=A verification Email has been sent to ${user.email}. Please verify Email address to log in.`
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.message)
  }
}

export const LoginUser = (user) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/auth/login`, user)
    if (res?.data) {
      let { data } = res
      console.log("ye data ha .......", res);
      ENV.encryptUserData(data.user, data.token, data.user[0]?.userId)
      dispatch({
        type: LOGIN_USER,
        payload: data
      })
      window.location.href = '/'
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const resendVerification = (email) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/auth/resend`, { email: email })
    console.log(res);
    if (res)
      toast.success(res.data.message)
  } catch (error) {
    console.log(error.message)
  }
}