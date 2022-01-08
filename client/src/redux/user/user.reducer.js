import { LOAD_USER, LOGOUT } from "./user.types";

const INITIAL_STATE = {
  isLoggedIn: false,
  loading: true,
  user: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: false
      }
    case LOGOUT: return {
      ...state,
      isLoggedIn: false,
      user: null,
      loading: false
    }
    default: return state
  }
}

export default reducer;