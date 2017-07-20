const Sequelize = require('sequelize')

const db = {}

const sequelize = new Sequelize('student-register', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const arrModels = [
  './models/User.js'
]

arrModels.forEach(function(modelPath) {
  const model = sequelize.import(modelPath);
  db[model.name] = model;
})


db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
