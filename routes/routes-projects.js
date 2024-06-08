const routes = require('express').Router()

const {
  findAll,
  save,findById
} = require('./../controllers/controll-projects')
routes.get('/',findAll)

routes.post('/saveprojects/:id',save)
routes.get('/buscarid/:id',findById)
module.exports = routes