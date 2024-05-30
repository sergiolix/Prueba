import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, refetch:fetchData };
}
//se creo por si se necesitara hacer mas consultas a diferentes api