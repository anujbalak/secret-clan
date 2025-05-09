import { Router } from "express";
import { getAccountPage } from "../controllers/accountController.js";

const accountRouter = Router();

accountRouter.get('/', getAccountPage)

export default accountRouter;