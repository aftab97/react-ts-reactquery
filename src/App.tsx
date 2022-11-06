import React from "react";
import { useQuery } from "@tanstack/react-query";
import { StateManagement } from "./Components/StateManagement";
import { Mutation } from "./Components/Mutation";
import axios from "axios";
import { Repos } from "./Types/example";

/*
Important Note to make:
Normal UseEffect vs ReactQuery

useEffect waits for component to mount before
running the fetch call which can create performance
issues

reactQuery will start the fetch call before mounting

--------------------------------
we will cover:

normal fetch call
mutation - create / post fetches
state manager - global state manager feature
state cache / server state async BONUS 
*/

export default function App(): JSX.Element {
  // basic fetch example

  const fetchRepos = (): Promise<Repos> =>
    axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data);

  const { isLoading, error, data, isFetching }: any = useQuery<Repos, Error>(
    ["repoData"],
    fetchRepos
  );

  if (isLoading) return <div>Loading Data....</div>;

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <p>{data && JSON.stringify(data)}</p>
      {/* {data.map((data: Repos) => data.name)} */}
      <p>{isFetching && "updating..."}</p>

      <StateManagement />
      <Mutation />
    </div>
  );
}
