import {register, login, logout} from "../controllers/authControllers.js";
import express from "express";
import {validate} from "../middlewares/validate.js";
import {loginSchema, registerSchema} from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/logout", logout);

export default router;
