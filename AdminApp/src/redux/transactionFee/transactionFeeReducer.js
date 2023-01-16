import { DISPLAY_TRANSACTION_FEE, SET_TRANSACTION_FEE, GET_TRANSACTION_FEE, DELETE_TRANSACTION_FEE, EDIT_TRANSACTION_FEE } from './transactionFeeTypes';

const initialState = {
   transactionFee: [],
   txFee: null,
   success: false,
   fetched: false
};

const transactionFeeReducer = (state = initialState, action) => {
   switch (action.type) {
      case DISPLAY_TRANSACTION_FEE:
         return {
            ...state,
            transactionFee: action.payload,
            success: false,
            fetched: true
         }
      case SET_TRANSACTION_FEE:
         return {
            ...state,
            transactionFee: action.payload,
            fetched: true
         }
      case GET_TRANSACTION_FEE:
         return {
            ...state,
            txFee: action.payload.transactionManagement[0]
         }
      case EDIT_TRANSACTION_FEE:
         return {
            ...state,
            transactionFee: action.payload,
            success: true
         }
      case DELETE_TRANSACTION_FEE:
         return {
            ...state,
            transactionFee: action.payload,
            success: true
         }
      default:
         return state
   }
}
export default transactionFeeReducer
