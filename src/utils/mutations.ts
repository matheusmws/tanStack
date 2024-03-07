import { useMutation } from "@tanstack/react-query";
import { addPost, removePost } from "./api";
import { queryClient } from "./QueryClient";
import { Post } from "@/types/Post";

export const useAddPost = () => {
    return useMutation({
        mutationFn: addPost,
        onError: (error, data, context) => {
            console.log('error', error);
        },
        onSuccess: (result: object, data: Omit<Post, 'id'>, context: any) => {
            console.log('success', result);

            const posts = queryClient.getQueryData(['posts']) as Post[];
            queryClient.invalidateQueries({ queryKey: ['posts'] }); // refetch after previously request - recommended

            // or

            //queryClient.setQueryData(['posts'], [data, ...posts]); //force update postlist - not recommended
        }
    });
};

export const useRemovePost = () => {
    return useMutation({
        mutationFn: removePost,
        onError: (error, data, context) => {
            console.log('error', error);
        },
        onSuccess: (result, data, context) => {
            console.log('data', data);
            console.log('success', result);
            queryClient.invalidateQueries({
                queryKey: ['posts']
            });
        }
    });
};