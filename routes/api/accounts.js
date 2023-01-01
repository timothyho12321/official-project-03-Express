const express = require('express')
const router = express.Router();
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const { Account } = require('../../models');
const validation = require('../../middlewares/validationMiddleWare');
const { apiAccountSchema } = require('../../validations/apiValidation');
const { addNewAccount } = require('../../dal/accounts');
const { parse } = require('path');


const generateAccessToken = (loginInAccount) => {

    return jwt.sign({
        'first_name': loginInAccount.first_name,
        'last_name': loginInAccount.last_name,
        'id': loginInAccount.id,
        'email': loginInAccount.email,
        'role_id': loginInAccount.role_id,

        // different way of getting params with account model
        // 'first_name': loginInAccount.get('first_name'),
        // 'last_name': loginInAccount.get('last_name'),
        // 'id': loginInAccount.get('id'),
        // 'email': loginInAccount.get('email'),
        // 'role_id': loginInAccount.get('role_id'),
    }, process.env.TOKEN_SECRET, {
        expiresIn: "1h"
    });
}


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;

}

//FOR testing route
router.get('/', async (req, res) => {

    console.log("ran the get route for api accounts")
    res.json({
        'message': "ran the get route for api accounts"
    })

})

router.post('/signup', validation(apiAccountSchema), async (req, res) => {

    // console.log("entered route for api account signup")

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = getHashedPassword(req.body.password);
    const contact_number = parseInt(req.body.contact_number);

    registerAccountObject = {
        first_name,
        last_name,
        email,
        password,
        contact_number
    }

    const newAccount = await addNewAccount(registerAccountObject);
    // console.log(newAccount.toJSON());

    res.json({
        'success_add_message': newAccount.toJSON()
    })

})

router.post('/login', async (req, res) => {

    // console.log("entered post route account API login");
    // console.log("req.body.email",req.body.email);

    let account = await Account.where({
        'email': req.body.email
    }).fetch({
        require: false
    })

    console.log(account.toJSON());

    if (account && account.get('password') == getHashedPassword(req.body.password)) {
        // if (user && user.get('password') == req.body.password) {

        const accountObject = {
            'first_name': account.get('first_name'),
            'last_name': account.get('last_name'),
            'id': account.get('id'),
            'email': account.get('email'),
            'role_id': account.get('role_id'),
        }


        let accessToken = generateAccessToken(accountObject);

        // let accessToken = generateAccessToken(userObject, process.env.TOKEN_SECRET, '15m')

        // let refreshToken = generateAccessToken(userObject, process.env.REFRESH_TOKEN_SECRET, '7d')


        res.json({
            'accessToken': accessToken,
            // 'refreshToken': refreshToken
        })


    } else {
        res.send({
            'error': "Wrong email or password was entered."
        })
    }


})


module.exports = router