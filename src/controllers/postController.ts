import { Request, Response } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../models/postModel";
import { validationResult } from "express-validator";

export const addPost = async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;

    if (!req.user) {
        res.status(401).json({ message: "Не авторизован" });
        return;
    }

    try {
        await createPost({
            user_id: (req.user as any).id,
            title,
            content,
        });

        res.status(201).json({ message: "Пост успешно создан" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const getAllPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await getPosts();
        if (!posts) {
            res.status(400).json({ message: "Не удалось получить список постов" });
            return
        }
        res.status(200).json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const getSinglePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const post = await getPostById(Number(id));
        if (!post) {
            res.status(404).json({ message: "Пост не найден" })
            return;
        }
        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const editPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!req.user) {
        res.status(401).json({ message: "Не авторизован" });
        return;
    }
    try {
        const post = await getPostById(Number(id))
        if (!post) {
            res.status(404).json({ message: "Пост не найден" })
            return;
        }
        if (post.user_id !== (req.user as any).id) {
            res.status(403).json({ message: "Авторизуйтесь что бы изменить пост" })
            return;
        }

        await updatePost(Number(id), title, content);
        res.status(200).json({ message: "Пост успешно обновлен" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const removePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!req.user) {
        res.status(401).json({ message: "Не авторизованы" });
        return
    }
    try {
        const post = await getPostById(Number(id));
        if (!post) {
            res.status(404).json({ message: "Пост не найден" })
        }

        if (post?.user_id !== (req.user as any).id) {
            res.status(403).json({ message: "Вы не можете удалить пост" })
            return
        }
        await deletePost(Number(id))
        res.status(200).json({ message: "Пост успешно удален" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ошибка сервера" })
    }
}