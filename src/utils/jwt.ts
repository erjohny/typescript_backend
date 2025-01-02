import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "secret123"; // В будущем замените на переменную окружения, например process.env.SECRET_KEY

/**
 * Генерация токена.
 * @param payload - Данные, которые будут включены в токен.
 * @returns Сгенерированный токен.
 */
export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Проверка и декодирование токена.
 * @param token - Токен, который нужно проверить.
 * @returns Декодированные данные или null, если токен недействителен.
 */
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // Проверяем, что результат является объектом
        if (typeof decoded === "object" && decoded !== null) {
            return decoded as JwtPayload; // Уточняем тип
        }
        return null; // Если `decoded` не объект, возвращаем null
    } catch (err) {
        return null; // Если произошла ошибка, возвращаем null
    }
};