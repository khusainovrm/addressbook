const jwt = require("jsonwebtoken")
const user = require("../../models/dummyUser")
const config = require("../config/config.js")

module.exports = (app) => {
  app.post("/user/login", (req, res, next) => {
    const { body } = req
    const { username } = body
    const { password } = body

    //Проверка, что юзер ввел правильный email и пароль
    if (username === user.username && password === user.password) {
      //Если все хорошо, генерирует и отправляет jwt токен
      jwt.sign(
        { user },
        config.JWT_Secret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err)
          }
          res.send(token)
        }
      )
    } else {
      console.log("ERROR: Could not log in")
    }
  })

  // Защищенные роуты
  app.get("/user/data", checkToken, (req, res) => {
    // Проверка JWT token
    jwt.verify(req.token, config.JWT_Secret, (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route")
        res.sendStatus(403)
      } else {
        //If token is successfully verified, we can send the autorized data
        res.json({
          message: "Successful log in",
          authorizedData
        })
        console.log("SUCCESS: Connected to protected route")
      }
    })
  })
}

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"]

  if (typeof header !== "undefined") {
    const bearer = header.split(" ")
    const token = bearer[1]

    req.token = token
    next()
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403)
  }
}
