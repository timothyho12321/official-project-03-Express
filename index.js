const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);


require("dotenv").config();

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(session({
    store: new FileStore(),  // use files to store sessions
    secret: 'keyboard cat',
    resave: false, // if the client access the web server and there's no change to session data, don't resave the session
    saveUninitialized: true // save a new session for each client that does not have a session 
  }))


  app.use(flash())
// Register Flash messages
app.use(function(req, res, next){
  res.locals.success_messages = req.flash("success_messages")
  res.locals.error_messages = req.flash("error_messages")
  next()
})

// Enable sessions to share the data of user with the hbs files using global middleware
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
  
  })
  


const landingRoutes = require('./routes/landing')
const productRoutes = require('./routes/products')
const accountRoutes = require('./routes/accounts')

async function main() {


    app.use('/', landingRoutes);
    app.use('/products', productRoutes);
    app.use('/accounts', accountRoutes)

}

main();

app.listen(3000, () => {
    console.log("Server has started!");
});

