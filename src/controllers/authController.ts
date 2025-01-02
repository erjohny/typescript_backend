import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/jwt"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() })
        return;
    }

    const { first_name, last_name, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "Этот email уже зарегистрирован" })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Пользователь успешно зарегистрирован" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });

    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() })
        return;
    }
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(400).json({ error: "Неверный логин или пароль" })
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({ error: "Неверный логин или пароль" })
            return;
        }

        const token = generateToken({ id: user.id, email: user.email })

        res.status(200).json({ token, message: "Вы успешно вошли" });
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
        console.error("Ошибка сервера", err);
    }
}

