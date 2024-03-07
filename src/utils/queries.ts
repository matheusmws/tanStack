import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts, getUsers } from "./api";
import { postsInitialData } from "@/data/postsInitialData";
import { queryClient } from "./QueryClient";

export const usePosts = (limit: number, start: number) => useQuery({
    queryKey: ['posts', { limit, start }],
    queryFn: () => getPosts(limit, start),
    placeholderData: postsInitialData
});

export const usePost = (id: number, enabled?: boolean) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id)
});

export const useUsersPrefetch = () => {
    queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });
};

export const invalidatePosts = () => {
    queryClient.invalidateQueries({
        queryKey: ['posts']
    });
};