import { ADD_PERMISSION, DISPLAY_PERMISSIONS, DELETE_PERMISSION } from './permissionTypes';

const initialState = {
   permissions: [],
   success: false,
   fetched: false
};

const permissionReducer = (state = initialState, action) => {
   switch (action.type) {
      case DISPLAY_PERMISSIONS:
         return {
            ...state,
            permissions: action.payload.permissions,
            success: false,
            fetched: true
         }
      case ADD_PERMISSION:
         return {
            ...state,
            permissions: action.payload.permissions,
            fetched: true
         }
      case DELETE_PERMISSION:
         return {
            ...state,
            permissions: action.payload.permissions,
            success: true,
            fetched: true
         }
      default:
         return state
   }
}
export default permissionReducer
