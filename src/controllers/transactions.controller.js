import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function createTransaction(req, res) {
  const { value, description } = req.body;
  const { type } = req.params;
  const user = res.locals.user;

  try {
    await db.collection("transactions").insertOne({
      idUser: user._id,
      type: type,
      value: value,
      description: description,
      time: dayjs().format('DD/MM')
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getTransactions(req, res) {
  const user = res.locals.user;

  try { 
    const transactions = await db.collection("transactions").find({ idUser: user._id }).toArray();
    res.status(201).send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}