import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SERVER_URL_$ } from "../lib/serverConfig";
import { LOGIN_URL_2 } from "../lib/spotify";
import { TunContext } from "../provider/tuneprovider";

function useAuth() {
  const { setData, data: ctxDAta, setSt } = useContext(TunContext);
  const router = useRouter();
  useEffect(() => {
    setSt("loading");

    async function loader() {
      console.log(LOGIN_URL_2, SERVER_URL_$);
      const code = new URLSearchParams(window.location.search).get("code");
      const data = JSON.parse(
        localStorage.getItem("sp_user_data") != "undefined"
          ? localStorage.getItem("sp_user_data")
          : null
      )
        ? JSON.parse(localStorage.getItem("sp_user_data"))
        : null;
      if (!code && data === null) {
        console.log("unauthenticated");
        setSt("unauthenticated");
        return;
      }
      data !== null && setData(data);
      data !== null && setSt("authenticated");
      console.log(ctxDAta);
      code &&
        axios
          .post(`${SERVER_URL_$}/login`, {
            code: code,
          })
          .then(async (data) => {
            await router.push("/");

            await setData(data.data.body);
            await localStorage.setItem(
              "sp_user_data",
              JSON.stringify({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
              })
            );
            setSt("authenticated");
          })
          .catch((err) => {
            console.log("auth", err);
            !data && setSt("unauthenticated");
          });
    }
    loader();
  }, []);
  return <div>useAuth</div>;
}

export default useAuth;
