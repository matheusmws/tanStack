import { Post } from "@/types/Post";
import { User } from "@/types/User";
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = async (limit: number = 10, start: number = 0): Promise<Post[]> => {
    const res = await api.get(`/posts?_limit=${limit}&_start=${start}`);
    return res.data;
};

export const getPost = async (id: number): Promise<Post> => {
    const res = await api.get(`/posts/${id}`);
    return res.data;
};

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get('/users');
    return res.data;
};

export const addPost = async (data: Omit<Post, 'id'>) => {
    const res = await api.post('/posts', data);
    return res.data;
};

export const removePost = async (id: number) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
};