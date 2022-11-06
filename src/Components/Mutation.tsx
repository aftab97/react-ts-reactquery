import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";

/*
    useMutation can be used to handled CRUD operations
    Add, Delete etc...

    You have a feature which allows you from nothing to to do a refetch,
    instead just update the state locally instead of doing another get
    req uest and getting the updated data
*/

export const Mutation = () => {
  const queryClient = new QueryClient();

  const mutation: any = useMutation({
    mutationFn: (newTodo) => {
      // e.preventDefault()
      console.log("fired");
      return axios.post("/todos", newTodo);
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (newToDo) => [
      // logic for youw want to refetch the data after pushing up some new data
      // this will now do a new GET request for the Pokemons
      queryClient.invalidateQueries(["getPokemons"]),

      /*
        You can also append your old data with the new data -
            Pros: No longer have to do another Get request
                  Makes it now instantly fast 
      */
      queryClient.setQueryData(["getPokemons"], (oldData: any) => [
        ...(oldData ?? []),
        newToDo,
      ]),
    ],
  });

  return (
    <div>
      {mutation.isLoading && <div>loading....</div>}
      <button onClick={mutation.mutate}>Create A ToDo</button>
    </div>
  );
};
