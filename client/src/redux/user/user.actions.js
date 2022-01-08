import { LOAD_USER, LOGOUT } from "./user.types";
import axios from "axios"

export const loadUser = async (dispatch) => {
  const res = await axios.get("http://localhost:5000/api/auth", { withCredentials: true })
  console.log(res.data)
  if (!res.data.message) dispatch({
    type: LOAD_USER,
    payload: res.data
  })
  else {
    await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
    dispatch({
      type: LOGOUT
    })
  }
}

export const logout = async (dispatch) => {
  await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
  dispatch({
    type: LOGOUT
  })
}