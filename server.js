const fs = require("fs")
const bodyParser = require("body-parser")
const jsonServer = require("json-server")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const chalk = require('chalk')
// const bcrypt = require('bcryptjs')

const server = jsonServer.create()
const router = jsonServer.router("./db.json")
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
  return jwt.verify(token, config.JWT_Secret, (err, decode) => decode !== undefined ? decode : err
  )
}

// api for /login
server.post("/login", async (req, res) => {
  const { email, password } = req.body
  const userdb = JSON.parse(fs.readFileSync("./db.json", "UTF-8"))

  const candidate = userdb.users.find(user => user.email === email)

  if (!candidate) {
    const status = 400
    const message = "User is not found"
    return res.status(status).json({status, message})
  }

  const isMatch = await bcrypt.compare(password, candidate.password)
  if (!isMatch) {
    const status = 400
    const message = "Wrong password"
    return res.status(status).json({status, message})
  }

  const token = createToken({ email, password })
  res.status(200).json({ token, userId: candidate.id, name: candidate.name })
})


// api for /register
server.post('/register', async (req, res) => {
  try {
    const {email, password, name} = req.body
    const userdb = JSON.parse(fs.readFileSync("./db.json", "UTF-8"))

    const candidate = await userdb.users.find(user => user.email === email)

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const id = Date.now()
    const user = {name, email, password: hashedPassword, id}
    userdb.users.push(user)

    fs.writeFileSync("./db.json", JSON.stringify(userdb), "UTF-8")

    const token = createToken({ email, password })
    const currentUser = {token, userId:id,name }
    

    res.status(201).json({ ...currentUser })

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})



// Защтиа роутов на наличие токена
server.use(/^(?!\/register).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401
    const message = "Bad authorization header"
    res.status(status).json({ status, message })
    return
  }
  const verified = verifyToken(req.headers.authorization.split(" ")[1])


  if (verified.message) {
    const status = 401
    const message = verified.message
    res.status(status).json({ status, message })
  } else {
    next()
  }
})

server.use(router)

server.listen(3000, () => {
  console.log(chalk.green("Json Server has been started..."))
})
