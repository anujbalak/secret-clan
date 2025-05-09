import { body, validationResult } from "express-validator";
import { deleteMessage, getAllMessages, updateTitle, getAllMessagesAndUsernames, updateText } from "../db/queries.js";
import { textValidationChain, titleValidationChain } from "./newMessageController.js";

export const postDeleteMessage = async ( req, res) => {
    try {
        const { messageId } = req.params;
        const allMessages = await getAllMessages();
        console.log(messageId, allMessages.length)
        if (!messageId) {
            return
        }
        await deleteMessage(Number(messageId));
        console.log('deleted')
        res.redirect('/')
    } catch (error) {
        console.error(error);
    }
}

export const getEditTitle = async (req, res) => {
    try {
        const { messageId } = req.params;
        res.render('pages/index', {isTitleEdit: true, editedMessageId: messageId});
    } catch (error) {
        
    }
}

export const getEditText = async (req, res) => {
    try {
        const { messageId } = req.params;
        res.render('pages/index', {isTextEdit: true, editedMessageId: messageId});
    } catch (error) {
        
    }
}

export const postEditTitle = [
    titleValidationChain(),
    async (req, res) => {
        try {
            const { messageId } = req.params;
            const { title } = req.body
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('pages/index', {isTitleEdit: true, editedMessageId: messageId, errors: errors.array()});
            }
            
           await updateTitle(title, Number(messageId));
           const allMessages = await getAllMessagesAndUsernames();
        //    res.render('pages/index', {isTitleEdit: false, messages: allMessages});
           res.redirect('/')
        } catch (error) {
            console.error(error)
        }
    }
]

export const postEditText = [
    textValidationChain(),
    async (req, res) => {
        try {
            const { messageId } = req.params;
            const { text } = req.body
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('pages/index', {isTextEdit: true, editedMessageId: messageId, errors: errors.array()});
            }
            
           await updateText(text, Number(messageId));
           const allMessages = await getAllMessagesAndUsernames();
           res.render('pages/index', {isTextEdit: false, messages: allMessages});
        } catch (error) {
            console.error(error)
        }
    }
]