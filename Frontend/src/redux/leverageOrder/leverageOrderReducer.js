import { GET_ORDER, ADD_ORDER, CLEAR_ORDER, GET_USER_ORDER, ORDER_ERROR, STOP_ORDER } from './leverageOrderTypes';

const initialState = {
   orders: [],
   userOrders: [],
   order: [],
   success: false,
   error: false
}

const LeverageOrderReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ORDER:
         return {
            ...state,
            orders: action.payload
         }
      case GET_USER_ORDER:
         return {
            ...state,
            userOrders: action.payload
         }
      case ADD_ORDER:
         return {
            ...state,
            order: action.payload,
            success: true,
            error: false
         }
      case CLEAR_ORDER:
         return {
            ...state,
            order: [],
            success: false,
            error: false
         }
      case STOP_ORDER:
         return {
            ...state,
            order: [],
            success: false,
            error: false
         }
      case ORDER_ERROR:
         return {
            ...state,
            error: true
         }
      default:
         return state
   }
}

export default LeverageOrderReducer
