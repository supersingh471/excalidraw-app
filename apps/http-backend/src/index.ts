import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types"
const app = express();

app.post("/signup", (req, res) => {
	//db call
	const data = CreateUserSchema.safeParse(req.body);
	if (!data.success) {
		return res.json({
			message: "incorrect inputs"
		})
	}
	res.json({
		userId: 1230	 
	})

})

app.post("/signin", (req, res) => {

	const userId = 1;
	const token = jwt.sign({
		userId
	}, JWT_SECRET);

	res.json({
		token
	})

})

app.post("/room", middleware ,(req, res) => {
	//dc call

	res.json({
		roomId: 1230
	})

})

app.listen(3001);

