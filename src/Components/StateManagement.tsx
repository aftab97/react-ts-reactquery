/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { PokemonInterface } from "../Types/PokemonInterface";
/*
    Can be used as state management as well
    React query provides a state async tool between server state
    and client state

    Problems Tackled:
    Before React Query we would have to fire a data fetch on mount -
    problem with this is it does not refetch often enough

    As long as you fetch with the same data query you can use elsewhere
*/

const fetchData = async (): Promise<PokemonInterface> => {
  return await axios
    .get("https://pokeapi.co/api/v2/berry/")
    .then((res) => res.data);
};
export const useTodos = () =>
  useQuery<PokemonInterface, Error>(["getPokemons"], fetchData);

// remember you have to use uppercase to name the function,
// now you can use this function anywhere and extract the data anywhere
// export const GlobalFetchQuery = () => useQuery(["globalRepoData"], fetchData);

export const StateManagement = () => {
  //being used in Component 1
  const { data } = useTodos();

  return (
    <>
      Global State Data For Pokemons:
      {/* <div>{JSON.stringify(data)}</div> */}
      {data?.results?.map((pokemon) => (
        <div>{pokemon.name}</div>
      ))}
      <br />
      <div>
        <StateManagement2 />
      </div>
    </>
  );
};

const StateManagement2 = () => {
  //being used in Component 2:
  const { data } = useTodos();

  return <>Global State Data 2: {JSON.stringify(data)}</>;
};
