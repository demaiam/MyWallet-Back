import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function createTransaction(req, res) {
  const { value, description } = req.body;
  const { type } = req.params;

  try {
    await db.collection("transactions").insertOne({
      type: type, 
      value: value,
      description: description,
      time: dayjs().format('DD:MM')
    });
    res.sendStatus(201);
  } catch (err) {
      res.status(500).send(err.message);
  }
}