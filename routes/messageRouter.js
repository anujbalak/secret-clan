import { Router } from "express";
import { getEditText, getEditTitle, postDeleteMessage, postEditText, postEditTitle } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.post('/delete/:messageId', postDeleteMessage)

messageRouter.get('/edit/title/:messageId', getEditTitle);
messageRouter.post('/edit/title/:messageId', postEditTitle);

messageRouter.get('/edit/text/:messageId', getEditText);
messageRouter.post('/edit/text/:messageId', postEditText)

export default messageRouter;