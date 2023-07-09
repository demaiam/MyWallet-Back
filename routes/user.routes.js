import { Router } from "express";
import { getUser, signin, signup } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaSignUp } from "../schemas/user.schemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(schemaSignUp), signup);
userRouter.post("/sign-in", signin);
userRouter.get('/signed-in-user', validateAuth, getUser);

export default userRouter;