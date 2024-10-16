  require('dotenv').config()
  
  const express = require('express')
  const app = express()
  const mongoose = require('mongoose')

  mongoose.connect(process.env.DATABASE_URL), {useNewUrlParser: true}
  const db = mongoose.connection
  db.on('error', (error) => console.log(error))
  db.once('open', () => console.log('connected to the server'))

  app.use(express.json())

  const itemsRouter = require('./routes/items')
  app.use('/items', itemsRouter)

  app.listen(3000, () => console.log('Server has started'))
