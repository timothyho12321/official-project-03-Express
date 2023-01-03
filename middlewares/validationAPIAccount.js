const validationAPIAccount = (schema) => async (req, res, next) => {

    const body = req.body;

    try {
        await schema.validate(body);
        next()

    } catch (error) {
        return res.json({ error });
    }


}

module.exports = validationAPIAccount