import { Router } from "express";
import { signin, signup } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaLogin, schemaSignUp } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(schemaSignUp), signup);
userRouter.post("/", validateSchema(schemaLogin), signin);

export default userRouter;