import { useEffect, useState } from "react";
import { spiApi } from "../lib/spotify";
function useUSerPlayList({ token }) {
  const [playList, setPlaylist] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  // console.log(playList);
  useEffect(() => {
    if (!token) return;
    async function loadPLaylist() {
      await spiApi.setAccessToken(token);
      try {
        const { body, statusCode } = await spiApi.getUserPlaylists();
        if (statusCode === 200) {
          setPlaylist(body.items);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    }
    loadPLaylist();
  }, [token]);
  return {
    loading,
    err,
    playList,
  };
}

export default useUSerPlayList;
