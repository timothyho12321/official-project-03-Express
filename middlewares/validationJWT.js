const jwt = require('jsonwebtoken')

const checkIfAuthenticated = (req, res, next) => {

    if (req.session.user) {
        next()

    } else {

        req.flash("error_messages", "Please sign to continue viewing the page");
        res.redirect('/users/login')

    }


}


const checkIfAuthenticatedJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.account = user;
            next();


        });


    } else {

        res.sendStatus(401);

    }



}



const checkIfOwner = function(req , res , next){
    const account = req.session.user
    if(account.role_id != 1){
        req.flash('error_messages' , "Unauthorised to proceed. Please check login.")
        res.redirect("/accounts/login")
    }
    else{
        next()
    }
}


module.exports = {
    checkIfAuthenticated, checkIfAuthenticatedJWT, checkIfOwner
}