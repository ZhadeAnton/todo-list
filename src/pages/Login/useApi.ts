import { useState } from "react";
import { API_URL } from "./const";

export function useApi() {
  const [dog, setDog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function fetchDog() {
    setIsLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDog(data.message);
        setIsLoading(false);
      });
  }

  //   useEffect(() => {
  //     fetchDog();
  //   }, []);

  return { dog, fetchDog, isLoading };
}
