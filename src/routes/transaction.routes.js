import { Router } from "express";
import { createTransaction, getTransaction } from "../controllers/transactions.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaTransaction } from "../schemas/transaction.schemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const transactionRouter = Router();

transactionRouter.use(validateAuth);

transactionRouter.get("/home", getTransaction);
transactionRouter.post("/nova-transacao/:tipo", validateSchema(schemaTransaction), createTransaction);

export default transactionRouter;