import { body } from "express-validator";

export const registerValidations =
    [
        body("first_name").notEmpty().withMessage("Имя обязательно"),
        body("last_name").notEmpty().withMessage("Фамилия обязательно"),
        body("email").isEmail().withMessage("Нвеерный email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Пароль должен быть не менее 6 символов"),
    ]


export const loginValidations =
    [
        body("email").isEmail().withMessage("Нвеерный email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Пароль должен быть не менее 6 символов"),
    ]


export const createPostValidations =
    [
        body("title").notEmpty().withMessage("Это поле обязательно"),
        body("content").notEmpty().withMessage("Это поле обязательно"),
    ]

export const updatePostValidations =
    [
        body("title").notEmpty().withMessage("Это поле обязательно"),
        body("content").notEmpty().withMessage("Это поле обязательно"),
    ]    