import { GET_PENDING_WITHDRAWS, APPROVE_PENDING_TRANSACTION, WITHDRAW_CURRENCY, ERROR_STATE, TOGGLE_STATE } from "./externalTransactionTypes";
import { apiHelper } from "../apiHelper"
import { toast } from "react-toastify";

export const getPendingWithdraws = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `/api/externalTransaction/pending-transactions`, '')
    if (res?.data) {
      let { data } = res
      // toast.success(res.data.message)
      dispatch({
        type: GET_PENDING_WITHDRAWS,
        payload: data
      })
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

export const approvePendingTransaction = (id) => async (dispatch) => {
  try {
    let res = await apiHelper("put", `/api/externalTransaction/complete-pending-transaction/${id}`, '')
    if (res?.data) {
      let { data } = res
      toast.success(res.data.message)
      dispatch({
        type: APPROVE_PENDING_TRANSACTION,
        payload: data
      })
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

export const submitWithdraw = (postData) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `/api/externalTransaction/withdraw-coins`, postData)
    if (res?.data) {
      let { data } = res
      toast.success(res.data.message)
      dispatch({
        type: WITHDRAW_CURRENCY,
        payload: data
      })
    }
    else {
      dispatch({
        type: ERROR_STATE
      })
    }
  } catch (error) {
    toast.error(error.response.message)
  }
}

export const updateState = () => async (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_STATE
    })
  } catch (error) {
    console.log(error.response.message)
  }
}
