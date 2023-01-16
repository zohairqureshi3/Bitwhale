import { EDIT_USER, SET_USER, CHANGE_PASS, GET_USER } from './userTypes';

const initialState = {
   user: [],
   passChanged: false
}

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_USER:
         return {
            ...state,
            user: action.payload
         }
      case EDIT_USER:
         return {
            ...state,
            user: action.payload
         }
      case SET_USER:
         return {
            ...state,
            user: action.payload
         }
      case CHANGE_PASS:
         return {
            ...state,
            passChanged: true
         }
      default:
         return state
   }
}

export default userReducer
