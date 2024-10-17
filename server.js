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


  // Login section

  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  app.set('view-engine', 'ejs')
  const bcrypt = require('bcrypt')
  const passport = require('passport') 
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')

  app.use(express.urlencoded({ extended: false}))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
     email => users.find(user => user.email === email),
     id => users.find(user => user.id === id)
  )

  // Users are stored in this array

  const users = []
  
// check authenticated gets called first => if not authenticated redirects them to login
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })

  app.get('/register',checkNotAuthenticated, (req,res) => {
    res.render('register.ejs')
  })

  app.get('/login', checkNotAuthenticated, (req,res) => {
    res.render('login.ejs')
  })

  //redirect to home after login
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.post('/register', checkNotAuthenticated, async (req,res) =>{
    try {
      const hashedPasswword = await bcrypt.hash(req.body.password, 10 )
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPasswword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
    console.log(users)
  })


  //Logging user out

  app.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/login')
  })

  //Function for authentication when not logged in

  function checkAuthenticated(req,res, next){
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }

  function checkNotAuthenticated(req,res,next) {
    if (req.isAuthenticated()){
     return res.redirect('/')
    }
    next()
  }