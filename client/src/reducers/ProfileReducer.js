import { GET_PROFILES, PROFILES_LOADING, DELETE_ACCOUNT, GET_ERRORS, CLEAR_ERRORS } from "../types/actionTypes";

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case PROFILES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    case ADD_PROFILE:
      return {
        ...state,
        transactions: [...state.profiles, action.payload]
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        profile: state.profiles.filter(profile => profile._id !== action.payload)
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};