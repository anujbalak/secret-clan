import { Router } from "express";
import { getNewMessage, postNewMessage } from "../controllers/newMessageController.js";

const newMessageRouter = Router();

newMessageRouter.get('/', getNewMessage)
newMessageRouter.post('/', postNewMessage);

export default newMessageRouter;
