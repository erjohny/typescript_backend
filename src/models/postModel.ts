import pool from "../utils/db";

interface Post {
    id?: number,
    user_id: number,
    title: string,
    content: string,
    created_at?: Date
};

export const createPost = async (post: Post): Promise<void> => {
    const query = "Insert into posts (user_id, title, content) values (?,?,?)";
    const values = [post.user_id, post.title, post.content];
    await pool.query(query, values)
}

export const getPosts = async (): Promise<Post[]> => {
    const query = `
    Select posts.id, posts.title, posts.content, 
           posts.created_at, users.first_name, users.last_name
           from posts
           inner join users on posts.user_id = users.id
           order by posts.created_at desc
    `;

    const [rows] = await pool.query(query);
    return rows as Post[];
}

export const getPostById = async (id: number): Promise<Post | null> => {
    const query = `
    Select posts.id, posts.title, posts.content, 
           posts.created_at, users.first_name, users.last_name
           from posts
           inner join users on posts.user_id = users.id
           where posts.id = ?
    `;
    const [rows] = await pool.query(query, [id]);
    return (rows as Post[])[0] || null
}

export const updatePost = async (id: number, title: string, content: string): Promise<void> => {
    const query = "Update posts set title = ?, content = ? where id = ?";
    await pool.query(query, [title, content, id]);
}

export const deletePost = async (id: number): Promise<void> => {
    const query = "Delete from posts where id = ?";
    await pool.query(query, [id]);
}

