const fs = require("fs")
const bodyParser = require("body-parser")
const jsonServer = require("json-server")
const jwt = require("jsonwebtoken")

const server = jsonServer.create()
const router = jsonServer.router("./db.json")
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"))
const config = require("./config/config")

server.use(jsonServer.defaults())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, config.JWT_Secret, { expiresIn: config.expiresIn })
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, config.JWT_Secret, (err, decode) =>
    decode !== undefined ? decode : err
  )
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  )
}

server.post("/login", (req, res) => {
  const { email, password } = req.body
  if (isAuthenticated({ email, password }) === false) {
    const status = 401
    const message = "Incorrect email or password"
    res.status(status).json({ status, message })
    return
  }
  const token = createToken({ email, password })
  res.status(200).json({ token })
})

server.post("/test", (req, res) => {
  const { email, password } = req.body
  const data = JSON.stringify(email)
  console.log(email)
  res.status(200).json({ message: data })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401
    const message = "Bad authorization header"
    res.status(status).json({ status, message })
    return
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1])
    next()
  } catch (err) {
    const status = 401
    const message = "Error: access_token is not valid"
    res.status(status).json({ status, message })
  }
})

server.use(router)

server.listen(3000, () => {
  console.log("Run Auth API Server")
})
