const express = require("express");
const cors = require('cors')
const hbs = require("hbs");
const wax = require("wax-on");
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf');


require("dotenv").config();

hbs.handlebars.registerHelper("changeDate", function (date) {
    return date.toISOString().slice(0, 10);

})


// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

//enable cors
app.use(cors());

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
    secret: process.env.SESSION_SECRET_KEY,
    resave: false, // if the client access the web server and there's no change to session data, don't resave the session
    saveUninitialized: true // save a new session for each client that does not have a session 
}))


app.use(flash())
// Register Flash messages
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash("success_messages")
    res.locals.error_messages = req.flash("error_messages")
    next()
})

// Enable sessions to share the data of user with the hbs files using global middleware
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();

})


//OLD CSURF ROUTE
// app.use(csrf());


const csrfInstance = csrf();
app.use(function (req, res, next) {

    if (req.url.slice(0, 5) == "/api/") {
        return next();

    }
    csrfInstance(req, res, next);

})



app.use(function (err, req, res, next) {
    // if the function for app.use has 4 parameters
    // it is an error handler. Any error from the previous middleware
    // will be passed to it
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash("error_messages", "Please retry because the form has unfortunately expired.");
        res.redirect('back');  // redirect with the 'back' as argument means to go back to the previous page
    } else {
        // if no error, go to the next middleware
        next();
    }
})

app.use(function (req, res, next) {
    // req.csrfToken() will return a valid CSRF token
    // and we make it available to all hbs files via `res.locals.csrfToken`

    if (req.csrfToken) {

        res.locals.csrfToken = req.csrfToken();

    }


    next();
})



const landingRoutes = require('./routes/landing')
const productRoutes = require('./routes/products')
const accountRoutes = require('./routes/accounts')
const cloudinaryRoutes = require('./routes/cloudinary');
const orderRoutes = require('./routes/orders')

// Middlewares and validation 
const validation = require("./middlewares/validationMiddleWare");
const productSchema = require("./validations/productValidation");


// define the api routes
const api = {
    cartForShopping: require('./routes/api/cart'),
    checkOutCart: require('./routes/api/checkout_internal'),
    checkOutCartFE: require('./routes/api/checkout'),

    checkOutStripe: require('./routes/api/checkout_stripe'),
    products: require('./routes/api/products'),
    frontEndAccount: require('./routes/api/accounts'),
    frontEndOrders: require('./routes/api/orders')
}


async function main() {

    app.use('/', landingRoutes);
    app.use('/products', productRoutes);
    app.use('/accounts', accountRoutes);
    app.use('/cloudinary', cloudinaryRoutes);
    app.use('/cloudinary', cloudinaryRoutes);
    app.use('/orders', orderRoutes)

    // define the api routes
    app.use('/api/cartforshopping', express.json(), api.cartForShopping)
    app.use('/api/cartcheckout', api.checkOutCart)
    app.use('/api/cartcheckoutreact', api.checkOutCartFE)

    app.use('/api/cartcheckout/update_payment', api.checkOutStripe)
    app.use('/api/products', express.json(), api.products)
    app.use('/api/accounts', express.json(), api.frontEndAccount)
    app.use('/api/orders', express.json(), api.frontEndOrders)

}

main();

app.listen(3000, () => {
    console.log("Server has started!");
});

