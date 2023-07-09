import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  try {
    await db.collection("users").insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const searchUser = await db.collection("users").findOne({ email });
    if (!searchUser) return res.status(404).send("User not registered");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(401).send("Incorrect password");

    await db.collection("session").deleteMany({ idUser: user._id });
    const token = uuid();
    await db.collection("session").insertOne({ token, idUser: user._id });

    res.send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUser(req, res) {
  const { session } = res.locals;

  try {
      const user = await db.collection("users").findOne({ _id: session.idUser });

      delete user.password;
      res.send(user);
  } catch (err) {
      res.status(500).send(err.message);
  }
}

export async function getUser(req, res) {
  const { session } = res.locals;

  try {
      const user = await db.collection("users").findOne({ _id: session.idUser });

      delete user.password;
      
      res.send(user);
  } catch (err) {
      res.status(500).send(err.message);
  }
}