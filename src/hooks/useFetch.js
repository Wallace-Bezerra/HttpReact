import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [id, setId] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState("");
  const [callFetch, setCallFetch] = useState(false);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setMethod(method);
      setConfig({
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    if (method === "DELETE") {
      setMethod("DELETE");
      setConfig({
        method: method,
        headers: { "Content-Type": "application/json" },
      });
      setId(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError("Houve algum erro");
      }

      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];
        const response = await fetch(...fetchOptions);
        const data = await response.json();
        setCallFetch(data);
      }
      if (method === "DELETE") {
        let fetchOptions = [`${url}${id}`, config];

        const response = await fetch(...fetchOptions);
        const data = await response.json();
        setCallFetch(data);
      }
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
