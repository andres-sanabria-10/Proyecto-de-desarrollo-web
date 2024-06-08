const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//Connect to database
require('./drivers/connect-db')

const app = express()
app.use(cors())
app.set('PORT',process.env.PORT || 3000 )

app.use(morgan('dev'))
app.use(express.json())

app.use('/modalities',require('./routes/routes-modalities'))
app.use('/projects',require('./routes/routes-projects'))

app.listen(app.get('PORT'),()=>console.log(`Server Ready al port ${app.get('PORT')}`))