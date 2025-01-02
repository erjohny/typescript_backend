import pool from "../utils/db";

interface User {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string;
    created_at?: Date
}

export const createUser = async (user: User): Promise<void> => {
    const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)
  `;

    const values = [user.first_name, user.last_name, user.email, user.password];
    await pool.query(query, values)
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = "Select * from users where email = ?";
    const [rows] = await pool.query(query, [email]);
    return (rows as User[])[0] || null;

}