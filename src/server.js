// Import deps
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
// Create app
const app = express()

// Use body parer
app.use(bodyParser.urlencoded({ extended: false }))

// Homepage
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// Register
app.use('/register', require('./routes/register'))

// Login
app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/views/login.html')
})
app.post('/login', function(req, res) {
  database.User.findOne({
    where: { email: req.body.email }
  })
  .then(function(user) {
    if (!user) {
      res.send('Please register first')
    } else if (user.password === req.body.password) {
      res.send('Logged in')
    } else {
      res.send('Incorrect password')
    }
  })
  .catch(function(e) {
    res.send('Error logging in')
    console.log(e)
  })
})

database.sequelize.authenticate()
.then(function() {
  console.log('Db connection succesful')
  database.sequelize.sync().then(() => {
    console.log('Db synced')
    app.listen(9999, () => {
      console.log('Server listening on port 9999')
    })
  })
})
.catch(function(error) {
  console.error(error)
})
