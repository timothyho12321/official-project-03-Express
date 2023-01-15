const express = require("express");
const router = express.Router()

const crypto = require('crypto')
const { createRegisterForm, bootstrapField, createLoginForm } = require("../forms");
const { Account } = require("../models");


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    // The output will be converted to hexdecimal
    const hash = sha256.update(password).digest('base64');
    return hash;
}

// router.get('/', (req, res) => {

//     res.send("test account")


// })

router.get('/register', (req, res) => {

    const registerForm = createRegisterForm();

    res.render('accounts/register', {
        'form': registerForm.toHTML(bootstrapField)
    })


})


router.post('/register', (req, res) => {

    const registerForm = createRegisterForm();

    registerForm.handle(req, {
        'success': async function (form) {
            const account = new Account();

            const { confirm_password, ...otherData } = form.data

            otherData.password = getHashedPassword(otherData.password)
            // Only allow staff acount to be created on backend
            otherData.role_id = 2;
            console.log(otherData);
            account.set(otherData)

            await account.save();
            req.flash('success_messages', `Your account ${account.get('first_name')} has been successfully created.`)
            res.redirect('/accounts/login');
        }
        ,
        'error': function (form) {
            res.render('accounts/register', {
                'form': form.toHTML(bootstrapField)
            })


        },
        'empty': function (form) {
            res.render('accounts/register', {
                'form': form.toHTML(bootstrapField)
            })
        }

    })

})


router.get('/login', (req, res) => {

    const loginForm = createLoginForm();

    res.render('accounts/login', {
        'form': loginForm.toHTML(bootstrapField)
    })


})


router.post('/login', (req, res) => {

    const loginForm = createLoginForm();




    loginForm.handle(req, {
        'success': async function (form) {

            let accountLogin = await Account.where({
                'email': form.data.email
            }).fetch({
                require: false
            });

            if (!accountLogin) {

                req.flash("error_messages", "Unfortunately, you keyed in wrong login details.")
                res.redirect('/accounts/login')
            } else {

                if (accountLogin.get('password') === getHashedPassword(form.data.password)) {


                    req.session.user = {
                        id: accountLogin.get('id'),
                        firstName: accountLogin.get('first_name'),
                        lastName: accountLogin.get('last_name'),
                        email: accountLogin.get('email'),
                        role_id: accountLogin.get('role_id')
                    }
                    console.log("check role id", req.session.user)

                    req.flash("success_messages", `Welcome again, ${accountLogin.get("first_name")} ${accountLogin.get("last_name")}`)

                    res.redirect('/accounts/profile');

                } else {
                    req.flash("error_messages", "Unfortunately, you keyed in wrong login. Please enter back the details you registered the account with.")
                    res.redirect('/accounts/login')

                }


            }

        }
        ,
        'error': function (form) {
            res.render('accounts/register', {
                'form': form.toHTML(bootstrapField)
            })


        },
        'empty': function (form) {
            res.render('accounts/register', {
                'form': form.toHTML(bootstrapField)
            })
        }

    })


})



router.get('/profile', (req, res) => {

    res.render('accounts/profile')


})





module.exports = router