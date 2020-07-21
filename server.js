const bodyParser = require("body-parser")
const jsonServer = require("json-server")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const chalk = require('chalk')


const server = jsonServer.create()
const router = jsonServer.router("./db.json")
const {JWT_Secret, expiresIn} = require("./config/config")

server.use(jsonServer.defaults())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

/*--------------START-LOWDB---------*/
const low = require('lowdb')
const FileSync = require('./node_modules/lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [], contacts: [] })
  .write()
/*--------------END--------------*/


// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, JWT_Secret, { expiresIn: expiresIn })
}
// Verify the token
function verifyToken(token) {
  return jwt.verify(token, JWT_Secret, (err, decode) => decode !== undefined ? decode : err
  )
}



// api for /login
server.post("/login", async (req, res) => {
  const { email, password } = req.body

  const candidate = db.get('users')
  .find({ email })
  .value()

  if (!candidate) {
    const status = 400
    const message = "Пользователь не найден"
    return res.status(status).json({status, message})
  }

  const isMatch = await bcrypt.compare(password, candidate.password)
  if (!isMatch) {
    const status = 400
    const message = "Неправильный пароль"
    return res.status(status).json({status, message})
  }

  const token = createToken({ email, password })

  res.status(200).json({ token, userId: candidate.id, name: candidate.name })
})


// api for /register
server.post('/register', async (req, res) => {
  try {
    const {email, password, name} = req.body

    const candidate = db.get('users')
    .find({ email })
    .value()

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const id = Date.now()
    const user = {name, email, password: hashedPassword, id}

    db.get('users')
    .push(user)
    .write()

    router.db.read('./db.json')

    const token = createToken({ email, password })
    const currentUser = {token, userId:id, name }

    res.status(201).json({ ...currentUser })

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


// POST - add contact
server.post('/contacts', async (req, res) => {
  try {
    const { name, phone, userId } = req.body
    const id = Date.now()
    const contact = { name, phone, userId, id }

    db.get('contacts').push(contact).write()
    router.db.read('./db.json')

    res.status(201).json({message: "Запись создана", contact : contact })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// DELETE - delete contact
server.delete('/contacts/:id', async (req, res) => {
  try {

    db.get('contacts')
    .remove({ id: +req.params.id })
    .write()

    router.db.read('./db.json')
    res.status(201).json({message: "Запись удалена" })
    
  } catch (e) {
    console.log(e)
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

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  router.db.read('./db.json')
  res.jsonp({
    body: res.locals.data
  })
}

server.use(router)

server.listen(3000, () => {
  console.log(chalk.green("JSON-SERVER has been started..."))
})
