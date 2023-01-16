import { GET_ORDER, ADD_ORDER } from './internalOrderTypes';

const initialState = {
   orders: [],
   order: [],
   success: false
}

const InternalOrderReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ORDER:
         return {
            ...state,
            orders: action.payload
         }
      case ADD_ORDER:
         return {
            ...state,
            order: action.payload,
            success: true
         }
      default:
         return state
   }
}

export default InternalOrderReducer
