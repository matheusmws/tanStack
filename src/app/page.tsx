"use client";

import { useAddPost, useRemovePost } from "@/utils/mutations";
import { invalidatePosts, usePosts, useUsersPrefetch } from "@/utils/queries";
import { useState } from "react";

const Page = () => {

  //Prefetch
  useUsersPrefetch();

  //variables
  const limit = 3;
  const [page, setPage] = useState(0);

  //Query
  const posts = usePosts(limit, page * limit);

  //Mutation
  const addPost = useAddPost();
  const removePost = useRemovePost();

  //generics
  const handlePrevButton = () => {
    setPage(page === 0 ? 0 : page - 1);
  };

  const handleNextButton = () => {
    setPage(page + 1);
  };

  const handleInsertNewPostButton = () => {
    invalidatePosts();
  };

  const handleAddButton = async () => {
    const data = {
      userId: 102,
      title: 'title teste',
      body: 'body teste'
    }

    try {
      await addPost.mutateAsync(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRemoveButton = async (id: number) => {
    try {
      await removePost.mutateAsync(id);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-3xl">TanStack</h1>

      <div className="my-3 p-3 border-white">
        <p className="block">Área de inserção de novo post</p>
        <button className="border border-white p-3 rounded-md m-3" onClick={handleInsertNewPostButton}>Refresh post</button>
      </div>

      <div className="border border-white p-3 my-3">
        <p>Adicionar novo post</p>

        <div className="flex">
          <div className="flex flex-col items-center">
            <button disabled={addPost.isPending} className="border border-white p-3 rounded-md m-3" onClick={handleAddButton}>Adicionar</button>
            <p>{addPost.status === 'idle' && 'ocioso'}</p>
            <p>{addPost.isPending && 'adicionando'}</p>
            <p>{addPost.isError && 'erro'}</p>
            <p>{addPost.isPaused && 'pausado'}</p>
            <p>{addPost.isSuccess && 'sucesso'}</p>
          </div>

          <div className="flex">
            <div className="flex flex-col items-center">
              <button disabled={removePost.isPending} className="border border-white p-3 rounded-md m-3" onClick={() => { handleRemoveButton(3) }}>Remover</button>
              <p>{removePost.status === 'idle' && 'ocioso'}</p>
              <p>{removePost.status === 'pending' && 'removendo'}</p>
              <p>{removePost.status === 'error' && 'erro'}</p>
              <p>{removePost.isPaused && 'pausado'}</p>
              <p>{removePost.status === 'success' && 'sucesso'}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="border border-white p-3 m-3">
        <div className="p-2">Last update: {new Date().toLocaleString()}</div>
        <div>Itens por página: {limit}</div>
        <div>Número da página: {page}</div>
        <button onClick={handlePrevButton} className="border mx-2 px-2">página anterior</button>
        <button onClick={handleNextButton} className="border mx-2 px-2">próxima página</button>
      </div>

      {posts.isLoading && 'Carregando...'}

      {posts.data &&
        <ul>
          {posts.data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Page;