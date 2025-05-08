import { body, validationResult } from "express-validator"
import { enterNewMessage } from "../db/queries.js"

export const titleValidationChain = () =>
    body('title').trim()
        .isAlpha("en-US", {ignore: " "}).withMessage('Enter a title')
        .isLength({max: 30, min: 3}).withMessage('Title length should be between 3 to 30 characters')

export const textValidationChain = () =>
    body('title').trim()
        .isAlpha("en-US", {ignore: " "}).withMessage('Enter your message')


export const getNewMessage = (req, res) => {
    if (req.user) {
        return res.render('pages/new-message')
    }
    res.redirect('/')
}

export const postNewMessage = [
    titleValidationChain(),
    textValidationChain(),
    async (req, res) => {
        if (!req.user) {
            return res.redirect('/')
        }
        if (!req.user.member) {
            return res.redirect('/')
        }
        const result = validationResult(req)
        const { title , text} = req.body;
        if (!result.isEmpty()) {
            return res.render('pages/new-message', {
                errors: result.array(),
                fallbackValues: {
                    title,
                    text
                }
            });
        }
        await enterNewMessage(title, text, req.user.id)
        res.redirect('/')
    }
]