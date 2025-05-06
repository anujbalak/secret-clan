import { Router } from "express";
import { getSignIn, postSignIn } from "../controllers/sign-in.js";

const signInRouter = Router();

signInRouter.get('/', getSignIn)
signInRouter.post('/', postSignIn)

export default signInRouter;