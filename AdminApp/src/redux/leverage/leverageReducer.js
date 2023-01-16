import { DISPLAY_LEVERAGE, SET_LEVERAGE, GET_LEVERAGE, DELETE_LEVERAGE, EDIT_LEVERAGE } from './leverageTypes';

const initialState = {
   leverage: [],
   success: false,
   fetched: false
};

const leverageReducer = (state = initialState, action) => {
   switch (action.type) {
      case DISPLAY_LEVERAGE:
         return {
            ...state,
            leverage: action.payload,
            success: false,
            fetched: true
         }
      case SET_LEVERAGE:
         return {
            ...state,
            leverage: action.payload,
            fetched: true
         }
      case GET_LEVERAGE:
         return {
            ...state,
            leverage: action.payload
         }
      case EDIT_LEVERAGE:
         return {
            ...state,
            leverage: action.payload,
            success: true
         }
      case DELETE_LEVERAGE:
         return {
            ...state,
            leverage: action.payload,
            success: true
         }
      default:
         return state
   }
}
export default leverageReducer
