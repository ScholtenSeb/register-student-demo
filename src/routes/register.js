const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/', function(req, res) {
  res.send(`
    <a href="/"><- Back</a>
    <h1>Register</h1>
    <form action="/register" method="post">
      <div>
        <label for="email">Email</label>
        <input type="text" name="email" id="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
      </div>
      <div>
        <input type="submit" value="Register">
      </div>
    </form>
  `)
})

router.post('/', function(req, res) {
  // register
  database.User.create({
    email: req.body.email,
    password: req.body.password,
  }).then(function() {
    res.send(`
      <h2>Thank you, you can <a href="/login">login</a> now</h2>
    `)
  })
  .catch(function(e) {
    res.send('Error registering')
    console.log(e)
  })
})

module.exports = router
