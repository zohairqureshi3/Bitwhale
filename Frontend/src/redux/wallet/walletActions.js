import { GET_WALLET, CREATE_WALLET } from "./RequestTypes";
import { apiHelper } from "../apiHelper"
import { toast } from "react-toastify";

export const getUserWallet = (userId, networkId) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/wallet/get-wallet/${userId}`, { 'network': networkId })
    if (res?.data) {
      let { data } = res
      // toast.success(res.data.message)
      dispatch({
        type: GET_WALLET,
        payload: data
      })
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

export const createUserWallet = (userId, networkId) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/wallet/create-wallet`, { 'network': networkId, 'user': userId })
    if (res?.data) {
      let { data } = res
      dispatch({
        type: CREATE_WALLET,
        payload: data
      })
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}