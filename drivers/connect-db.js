const mongoose = require('mongoose')

const URI = "mongodb+srv://andressanabria02:Yadira.10@cluster0.5zq35cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.set('strictQuery')

mongoose.connect(URI)
  .then(()=> console.log('Connect Success...'))
  .catch( err => console.log(err))

module.exports = mongoose
