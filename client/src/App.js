import { useEffect } from "react"
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import { loadUser, logout } from "./redux/user/user.actions"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser(dispatch);
  }, [])

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            {user.isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : <Login />}
          </Route>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </>
  )
}

export default App;