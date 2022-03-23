const { check, validationResult } = require("express-validator")

const registerRules = () => [
    check("email", "this fild should be a valid email address").isEmail(),
    check("password", "password should contain at least 6 characters").isLength({ min: 6 }),
    check("fullName", "full name is required").notEmpty()
]


const validator = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }
    next()
}

module.exports ={registerRules, validator}