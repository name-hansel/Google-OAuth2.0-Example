import { useDispatch } from "react-redux"
import { logout } from "../redux/user/user.actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={e => logout(dispatch)}>Logout</button>
    </>
  )
}

export default Dashboard;