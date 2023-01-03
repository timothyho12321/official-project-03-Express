const validationReq = (schema) => async (req,res,next) => {

    const query = req.query;
    
    try {
    await schema.validate(query);
    next()
    
    } catch (error) {
        return res.json({error});
    }
    
    
    }
    
    module.exports = validationReq