import { GET_ACCOUNT } from './accountTypes';

const initialState = {
   account: []
}

const AccountReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ACCOUNT:
         return {
            ...state,
            account: action.payload
         }
      default:
         return state
   }
}

export default AccountReducer
