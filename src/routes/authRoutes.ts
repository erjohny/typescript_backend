import { Router } from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/authController";
import { registerValidations, loginValidations } from "../utils/validations";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();



router.post("/register", registerValidations, registerUser)

router.post("/login", loginValidations, loginUser)

router.get("/profile", authenticate, (req, res) => {
    res.status(200).json({ message: "Маршрут защищен", user: req.user })
})

export default router;