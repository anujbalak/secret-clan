import { Router } from "express";
import { getMemberPage, postMemberDetails } from "../controllers/memberController.js";

const memberRouter = Router();

memberRouter.get('/', getMemberPage);
memberRouter.post('/', postMemberDetails);

export default memberRouter