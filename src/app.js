import express from "express";
import cors from "cors";
import router from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
	await mongoClient.connect();
	console.log("MongoDB connected");
} catch (err) {
	(err) => console.log(err.message);
}

const db = mongoClient.db();

app.post("/", async (req, res) => {
	const { email, password } = req.body;

	const schemaLogin = Joi.object({
		email: Joi.string().email(),
		password: Joi.string().required()
	});
	
	const validateLogin = schemaLogin.validate(req.body, { abortEarly: false });

	if (validateLogin.error) {
		const errors = validation.error.details.map(detail => detail.message);
		return res.status(422).send(errors);
	}

	try {
		const searchUser = await db.collection("").findOne({ email: email });
		if (!searchUser) return res.status(404).send("Email not registered");
		if (searchUser.password != password) return res.status(401).send("Invalid password");

		res.send().status(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.post("/cadastro", async (req, res) => {
	const { name, email, password } = req.body;

	const schemaSignUp = Joi.object({ 
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(3)
	});

	const validateSignUp = schemaSignUp.validate(req.body, { abortEarly: false });

	if (validateSignUp.error) {
		const errors = validation.error.details.map(detail => detail.message);
		return res.status(422).send(errors);
	}

	try {
		const searchUser = await db.collection("").findOne({ email: email });
		if (searchUser) return res.status(404).send("Email already registered");

		await db.collection("cadastro").insertOne({
			name: name,
			email: email,
			password: password
		});

		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
});
*/