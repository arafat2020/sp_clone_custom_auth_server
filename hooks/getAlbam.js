import { useEffect, useState } from "react";
import { spiApi } from "../lib/spotify";

function useAlbam({ token, id }) {
  const [album, setAlbum] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    if (!token || !id) return;
    async function loader() {
      setLoading(true);
      await spiApi.setAccessToken(token);
      spiApi
        .getAlbum(id)
        .then((res) => {
          setAlbum(res.body);
        })
        .catch((err) => {
          setErr(err);
        })
        .finally(() => setLoading(false));
    }
    loader();
  }, [token,id]);

  return {
    album,
    loading,
    err,
  };
}

export default useAlbam;
