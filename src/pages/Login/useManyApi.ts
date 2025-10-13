import { useState } from "react";
import { API_3_URL } from "./const";

export function useManyApi() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchDogs() {
    setIsLoading(true);
    fetch(API_3_URL)
      .then((res) => res.json())
      .then((data) => {
        setDogs(data.message);
        setIsLoading(false);
      });
  }
  return { dogs, fetchDogs, isLoading };
}
