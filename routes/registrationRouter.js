import { Router } from "express";
import { getRegistration, postRegistration } from "../controllers/registrationController.js";

const registrationRouter = Router();

registrationRouter.get('/', getRegistration);
registrationRouter.post('/', postRegistration);

export default registrationRouter;