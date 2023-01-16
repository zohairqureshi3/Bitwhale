import { GET_ACCOUNT } from "./accountTypes";
import { apiHelper } from "../apiHelper"
import { toast } from "react-toastify";

export const getAccount = (Id) => async (dispatch) => {
  try {
    let res = await apiHelper("get", `/api/account/` + Id, '')
    if (res?.data) {
      let { data } = res
      // toast.success(res.data.message)
      dispatch({
        type: GET_ACCOUNT,
        payload: data.account
      })
    }
  } catch (error) {
    // toast.error(error.response.message)
  }
}