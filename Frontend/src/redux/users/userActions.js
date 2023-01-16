import { EDIT_USER, SET_USER, CHANGE_PASS, GET_USER } from "./userTypes";
import { apiHelper } from "../apiHelper"
import { toast } from "react-toastify";

export const getUser = (id) => async (dispatch) => {
  id = id || '';
  try {
    let res = await apiHelper("get", `/api/user/${id}`, '')
    if (res?.data) {
      let { data } = res
      dispatch({
        type: GET_USER,
        payload: data.user,
      })
      // toast.success(res.data.message)
    }
  } catch (error) {
    // console.log(error.response.message)
    // toast.error(error.response.message)
  }
}

export const setUser = (user) => async (dispatch) => {
  try {
    let { users } = user
    dispatch({
      type: SET_USER,
      payload: users
    })
  } catch (error) {
    toast.error(error.response)
  }
}

export const editUser = (id, data) => async (dispatch) => {
  try {
    let res = await apiHelper("put", `/api/user/${id}`, data)
    if (res?.data) {
      let { data } = res
      toast.success(res.data.message)
      dispatch({
        type: EDIT_USER,
        payload: data.user
      })
    }
  } catch (error) {
    console.log(error.response.message)
    toast.error(error.response.message)
  }
}

export const forgetPassEmail = (data) => async (dispatch) => {
  try {
    let res = await apiHelper("put", `/api/user/forget-passsword-email`, data)
    if (res?.data) {
      let { data } = res
      toast.success(data.message)
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

export const forgetPassword = (data) => async (dispatch) => {
  try {
    let res = await apiHelper("put", `/api/user/forget-passsword`, data)
    if (res?.data) {
      let { data } = res
      toast.success(data.message)
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

// export const changePassword = (data) => async (dispatch) => {
//   try {
//     let res = await apiHelper("put", `/api/user/change-passsword`, data)
//     if (res?.data) {
//       let { data } = res
//       toast.success(data.message)
//     }
//   } catch (error) {
//     toast.error(error.response.message)
//   }
// }

export const changePassword = (id, data) => async (dispatch) => {
  try {
    let res = await apiHelper("put", `/api/user/change-password/${id}`, data)
    console.log(data, "dd");
    if (res?.data) {
      let { data } = res
      toast.success(data.message)
      dispatch({
        type: CHANGE_PASS
      })
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

export const sendTransactionDataToDB = (data) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/wallet/add`, data)
    if (res?.data) {
      let { data } = res
      toast.success(data.message)
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}
