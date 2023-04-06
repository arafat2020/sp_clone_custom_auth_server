import axios from "axios";
import { useEffect, useState } from "react";

function useInitialSearch({ token, limit = 4, offset = 0, term }) {
  const [initialReasult, setIntialReasult] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      if(!token && !term) term
        axios
          .get(
            `https://api.spotify.com/v1/search?q=${term}&type=track%2Cartist%2Cplaylist%2Calbum&market=US&limit=${limit}&offset=${offset}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setIntialReasult(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setErr(err);
          });
    }, 400);
    return () => clearTimeout(debounce);
  }, [token, term]);
  return {
    initialReasult,
    loading,
    err,
  };
}

export default useInitialSearch;
