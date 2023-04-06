import React, { useEffect, useState } from "react";
import { spiApi } from "../lib/spotify";

function useCategory({ token,name }) {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    async function loader() {
      if(!token && !name) return
      token && (await spiApi.setAccessToken(token));
      token && name &&
        (await spiApi
          .getPlaylistsForCategory(name,{limit:32})
          .then((res) => {
            setCategory(res.body.playlists.items);
            setLoading(false);
          })
          .catch((err) => {
            setErr(err);
            setLoading(false);
          }));
    }
    loader()
  }, [token]);
  return {
    category,
    loading,
    err,
  };
}

export default useCategory;
