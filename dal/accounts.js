const express = require('express');
const { Account } = require('../models');

async function addNewAccount(registerAccountObject) {

    const newAccount = new Account();
    registerAccountObject.created_date = new Date();
    registerAccountObject.modified_date = new Date();
    registerAccountObject.role_id = 3;
    
    console.log("registerAccountObject", registerAccountObject);

    newAccount.set(registerAccountObject);
    await newAccount.save();

    return newAccount;

}

module.exports = { addNewAccount }