import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { SERVER_URL_$ } from "../lib/serverConfig";
import { TunContext } from "../provider/tuneprovider";

function useSession2() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const { data, setData } = useContext(TunContext);
  useEffect(() => {
    console.log("r", data);
    if (data) {
      setAccessToken(data?.access_token);
      setExpiresIn(data?.expires_in);
      setRefreshToken(data?.refresh_token);
    } else {
      const nData = JSON.parse(
        localStorage.getItem("sp_user_data") != "undefined"
          ? localStorage.getItem("sp_user_data")
          : null
      );
      setData(nData);
    }
  }, [data]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${SERVER_URL_$}/refresh`, {
          refreshToken,
        })
        .then(async (res) => {
          console.log(res);
          await localStorage.setItem(
            "sp_user_data",
            JSON.stringify({
              accessToken: data.body.access_token,
              refreshToken: refreshToken,
              expiresIn: data.body.expires_in,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  return {
    accessToken,
  };
}

export default useSession2;
