import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { spiApi } from "../lib/spotify";

function useArtist({ token, id }) {
  const [artist, setArtst] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    if (!token && !id) return;
    setLoading(true);
    async function loader() {
      await spiApi.setAccessToken(token);
      spiApi
        .getArtist(id)
        .then((art) => {
          setArtst(art.body);
        })
        .catch((err) => {
          setErr(err);
        })
        .finally(() => setLoading(false));
    }
    loader();
  }, [token, id]);
  return {
    artist,
    loading,
    err,
  };
}

export default useArtist;
