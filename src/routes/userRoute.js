import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser, validate } from "../controllers/userController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const userRoute = Router(); 

userRoute.get("/get", verifyTokenMiddleware, getUsers);
userRoute.post("/create", createUser);
userRoute.post("/login", validate);
userRoute.delete("/delete/:id", verifyTokenMiddleware, deleteUser);
userRoute.put("/update/:id", updateUser);

export default userRoute;