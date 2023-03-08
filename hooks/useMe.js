import React, { useEffect, useState } from "react";
import { spiApi } from "../lib/spotify";

function useMe({ token }) {
  const [me, setME] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    async function loader() {
      await spiApi.setAccessToken(token);
      spiApi
        .getMe()
        .then((data) => {
          setME(data.body);
        })
        .catch((err) => {
          setErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    loader();
  }, [token]);

  return {
    me,
    err,
    loading,
  };
}

export default useMe;
