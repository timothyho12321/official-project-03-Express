const yup = require('yup');
require('yup-password')(yup) 

const apiAccountSchema = yup.object({

    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().password().required(),
    contact_number: yup.string().min(8).required(),

})


module.exports =
{
    apiAccountSchema
}