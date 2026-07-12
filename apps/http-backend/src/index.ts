import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateRoom, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";



const app = express();
app.use(express.json())

app.post("/signup", async (req, res) => {
	
	const parsedData = CreateUserSchema.safeParse(req.body);
	if (!parsedData.success) {
		return res.json({
			message: "incorrect inputs"
		})
	}

	const { email, password, name } = parsedData.data;

	try {
		const user = await prismaClient.user.create({
			data: {
				email,
				name,
				password,
			}
		});

			res.json({
			userId: user.id	 
		});
	} catch(e) {
		res.status(411).json({
			message: "User already exist with this email"
		});
	}
	

});

app.post("/signin", (req, res) => {
	const data = SigninSchema.safeParse(req.body);

	if (!data.success) {
		res.json({
			message: "Incorrect Inputs"
		})

		return;
	}


	const userId = 1;
	const token = jwt.sign({
		userId
	}, JWT_SECRET);

	res.json({
		token
	})

})

app.post("/room", middleware ,(req, res) => {
	const data = CreateRoom.safeParse(req.body);

	if (!data.success) {
		res.json({
			message: "incorrect input"
		});

		return
	}

	res.json({
		roomId: 1230
	})

})

app.listen(3001);

