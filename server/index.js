const express = require("express")
const app = express();

const cors = require("cors")
const axios = require("axios")
const qs = require('qs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")

// TODO auth middleware

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser())
require('dotenv').config();

app.get("/api/auth/google", async (req, res) => {
  try {
    // Get code from query
    const code = req.query.code;

    // Fetch token and id
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
      grant_type: 'authorization_code'
    }

    const { data: { id_token, access_token } } = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    // Get user details by decoding token
    const user = jwt.decode(id_token)

    // Upsert user
    // Add user if not in database

    // Create access and refresh tokens
    const accessToken = await jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET
    );

    const options = {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "lax",
      secure: false,
    }

    // Set cookies
    res.cookie("access-token", accessToken, options);

    // Redirect back to client
    res.redirect("http://localhost:3000")
  } catch (e) {
    console.error(e.message)
  }
})

app.get("/api/auth", (req, res) => {
  if (req.cookies['access-token']) {
    const user = jwt.decode(req.cookies['access-token'])
    const { email, family_name, given_name, name, picture, sub } = user;
    res.status(200).json({
      email, family_name, given_name, name, picture, sub
    })
  }
  else
    res.status(400).json({
      message: "Sign out"
    })
})

app.get("/api/auth/logout", (req, res) => {
  res.cookie("access-token", "", {
    httpOnly: true,
    expires: new Date(),
  });
  res.status(200).send("Logged out")
})

app.listen(5000, () => {
  console.log("Listening at port 5000")
})