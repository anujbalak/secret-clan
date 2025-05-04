import { query, body, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import { getUserByEmail, registerNewUser } from "../db/queries.js"

const getRegistration = async (req, res) => {
    res.render('pages/registration')
}

const regFallbackValues = {
    firstname: '',
    lastname: '',
    email: '',
}

export const firstnameValidationChain = () => 
    body('firstname').trim()
        .isString().withMessage('First Name should be a string')
        .isAlpha().withMessage("First name can't be empty")
        .isLength({min: 2, max: 20}).withMessage('First name should be between 2 to 20 letters')

export const lasstnameValidationChain = () => 
    body('lastname').trim()
    .isString().withMessage('Last Name should be a string')
    .isAlpha().withMessage("Last name can't be empty")
    .isLength({min: 2, max: 20}).withMessage('Last name should be between 2 to 20 letters')

export const emailValidationChain = () => 
    body('email').trim()
    .isEmail().withMessage('Enter an email')

export const usedEmailValidationChain = () =>
    body('email').custom(async value => {
        const user = await getUserByEmail(value);
        if (user) {
            throw new Error('E-mail already in use');
        }
    })
    
export const passwordValidationChain = () =>
    body('password').trim()
    .isStrongPassword().withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')

export const confirmPasswordValidationChain = () =>
    body('confirmPassword').trim()
    .custom((value, {req}) => {
        return value === req.body.password
    }).withMessage('Password is not matching')

const postRegistration = [
    firstnameValidationChain(),
    lasstnameValidationChain(),
    emailValidationChain(),
    usedEmailValidationChain(),
    passwordValidationChain(),
    confirmPasswordValidationChain(),
    async (req, res) => {
        const result = validationResult(req);
        const { firstname, lastname, email, password} = req.body;
        populateFallbackvalues({firstname, lastname, email})
        if (!result.isEmpty()) {
            return res.render('pages/registration', {
                errors: result.array(),
                fallbackValues: regFallbackValues 
            })
        }
        const hashedPassword = bcrypt.hash(password, 10);
        try {
            await registerNewUser({firstname, lastname, email, password: hashedPassword})
        } catch (error) {
            console.error("Something is wrong")   
        }
        res.redirect('/')
    }
]

const populateFallbackvalues = ({firstname, lastname, email}) => {
    regFallbackValues.firstname = firstname;
    regFallbackValues.lastname = lastname;
    regFallbackValues.email = email;
    return
}

export {
    getRegistration,
    postRegistration
}

// isStrongPassword({
//   minLength: 8,
//   minLowercase: 1,
//   minUppercase: 1,
//   minNumbers: 1,
//   minSymbols: 1,
//   returnScore: false,
//   pointsPerUnique: 1,
//   pointsPerRepeat: 0.5,
//   pointsForContainingLower: 10,
//   pointsForContainingUpper: 10,
//   pointsForContainingNumber: 10,
//   pointsForContainingSymbol: 10,
// })