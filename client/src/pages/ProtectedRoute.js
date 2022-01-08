import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.user)

  return <Route
    {...rest}
    render={(props) =>
      !user.isLoggedIn ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
}

export default ProtectedRoute;