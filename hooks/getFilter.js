import axios from "axios";
import React, { use, useEffect, useState } from "react";

function useFilter({ token, limit = 15, offset = 0, term, filter }) {
  const [filterSarch, setFilterSearch] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    if (!token && !term && !filter) return;
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${term}&type=${filter}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        setFilterSearch(e.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err);
      });
  }, [token, term, filter]);
  return {
    filterSarch,
    loading,
    err,
  };
}

export default useFilter;
