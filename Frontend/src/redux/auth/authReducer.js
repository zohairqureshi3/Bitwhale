import { REGISTER_USER, LOGIN_USER } from './authTypes';

const initialState = {
   user: []
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case REGISTER_USER:
         return {
            ...state,
            user: action.payload,
         }
      case LOGIN_USER:
         return {
            ...state,
            isLoggedIn: true,
            user: action.payload
         }
      default:
         return state
   }
}

export default authReducer
