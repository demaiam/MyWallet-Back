import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  try {
    const searchUser = await db.collection("users").findOne({ email });
    if (searchUser) return res.status(404).send("Email já cadastrado");

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
    if (!searchUser) return res.status(404).send("Email não cadastrado");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(401).send("Senha incorreta");

    await db.collection("session").deleteMany({ idUser: user._id });
    const token = uuid();
    await db.collection("session").insertOne({ token, idUser: user._id });

    const data = { token: token, name: searchUser.name };

    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
}