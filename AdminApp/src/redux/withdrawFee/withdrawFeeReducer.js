import { DISPLAY_WITHDRAW_FEE, SET_WITHDRAW_FEE, GET_WITHDRAW_FEE, DELETE_WITHDRAW_FEE, EDIT_WITHDRAW_FEE } from './withdrawFeeTypes';

const initialState = {
   withdrawFee: [],
   txFee: null,
   success: false,
   fetched: false
};

const withdrawFeeReducer = (state = initialState, action) => {
   switch (action.type) {
      case DISPLAY_WITHDRAW_FEE:
         return {
            ...state,
            withdrawFee: action.payload,
            success: false,
            fetched: true
         }
      case SET_WITHDRAW_FEE:
         return {
            ...state,
            withdrawFee: action.payload,
            fetched: true
         }
      case GET_WITHDRAW_FEE:
         return {
            ...state,
            withdrawFee: action.payload
         }
      case EDIT_WITHDRAW_FEE:
         return {
            ...state,
            withdrawFee: action.payload,
            success: true
         }
      case DELETE_WITHDRAW_FEE:
         return {
            ...state,
            withdrawFee: action.payload,
            success: true
         }
      default:
         return state
   }
}
export default withdrawFeeReducer
