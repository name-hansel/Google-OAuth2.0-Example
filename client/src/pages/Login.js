const Login = () => {
  // OAuth URL
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`
  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(" ")
  }
  // URL encode options
  const qs = new URLSearchParams(options)

  const url = `${rootUrl}?${qs.toString()}`

  return <a href={url}>Login with Google</a>
}

export default Login;