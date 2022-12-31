const yup = require('yup');


const productSchema = yup.object({

    name: yup.string().required()

})

const searchSchema = yup.object({

    name: yup.string(),
    cost: yup.number(),
    width: yup.number(),
    height: yup.number(),
    shape: yup.string(),
    // smells: yup.number(),
    // oils: yup.number(),

})


module.exports =
{
    productSchema,
    searchSchema
}