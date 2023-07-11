import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function createTransaction(req, res) {
  const { value, description } = req.body;
  const { type } = req.params;
  const { auth } = req.headers;

  const token = auth?.replace("Bearer ", "");
  const session = await db.collection("session").findOne({ token });
  const user = await db.collection("users").findOne({ _id: session.idUser });

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
  const { auth } = req.headers;

  const token = auth?.replace("Bearer ", "");
  const session = await db.collection("session").findOne({ token });
  const user = await db.collection("users").findOne({ _id: session.idUser });

  try { 
    const transactions = await db.collection("transactions").find({ idUser: user.idUser }).toArray();
    res.status(201).send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}