import { ADD_ROLE, DISPLAY_ROLES, GET_ROLE, GET_PER_ROLE, EDIT_ROLE, DELETE_ROLE } from './roleTypes';

const initialState = {
   roles: [],
   role: [],
   editRole: [],
   allPermissions: [],
   success: false,
   fetched: false
};

const roleReducer = (state = initialState, action) => {
   switch (action.type) {
      case DISPLAY_ROLES:
         return {
            ...state,
            roles: action.payload,
            success: false,
            fetched: true
         }
      case GET_ROLE:
         return {
            ...state,
            editRole: action.payload.role,
            allPermissions: action.payload.allPermissions,
            fetched: true
         }
      case GET_PER_ROLE:
         return {
            ...state,
            role: action.payload.role
         }
      case ADD_ROLE:
         return {
            ...state,
            roles: action.payload.roles
         }
      case EDIT_ROLE:
         return {
            ...state,
            roles: action.payload.roles,
            success: true
         }
      case DELETE_ROLE:
         return {
            ...state,
            roles: action.payload.roles,
            success: true
         }
      default:
         return state
   }
}
export default roleReducer
