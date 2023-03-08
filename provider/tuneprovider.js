import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { BASE_URL, SERVER_URL_$ } from "../lib/serverConfig";

export const TunContext = createContext();

export const TuneProvider = ({ children }) => {
  const [plist, setPlist] = useState();
  const [track, setTrack] = useState();
  const [side, setSide] = useState(false);
  const [ld, setLd] = useState(true);
  const [data, setData] = useState();
  const [st, setSt] = useState();
  const [session, setsession] = useState();
  const router = useRouter();
  useEffect(() => {
    async function main() {
      setLd(true);
      const code = await new URLSearchParams(window.location.search).get(
        "code"
      );
      const nData = await JSON.parse(
        localStorage.getItem("sp_user_data") ??
          localStorage.getItem("sp_user_data")
      );
      // console.log("ctx", nData);
      if (nData === null && !code && !session) {
        setLd(false);
        if (window.location.host !== `${BASE_URL}/login`) router.push("/login");
        // console.log("unathemticated",window.location.host);
      }
      if (nData !== null) {
        await setsession(nData);
        setLd(false);
        return;
      }
      if (code) {
        async function loader() {
          await axios
            .post(`${SERVER_URL_$}/login`, {
              code: code,
            })
            .then((res) => {
              localStorage.setItem("sp_user_data", JSON.stringify(res.data));

              // console.log('ctxres',res.data);
              setsession(res.data);
            })
            .catch((err) => {
              // console.log('ctxerr',err);
              return err;
            })
            .finally(async () => {
              await setLd(false);
              window.history.pushState({}, null, "/");
            });
        }
        loader();
      }
    }
    main();
  }, []);
  useEffect(() => {
    if (!session) return;
    const interval = setInterval(() => {
      setLd(true);
      axios
        .post(`${SERVER_URL_$}/refresh`, {
          refreshToken: session.refreshToken,
        })
        .then(async (res) => {
          // console.log(res.data);
          await setsession(res.data);
          await localStorage.setItem("sp_user_data", JSON.stringify(res.data));
          setLd(false);
        })
        .catch((err) => {
          // console.log(err);
          setLd(false);
        });
    }, (session.expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [session]);
  return (
    <TunContext.Provider
      value={{
        plist,
        setPlist,
        track,
        setTrack,
        side,
        setSide,
        data,
        setData,
        st,
        setSt,
        session,
        setsession,
      }}
    >
      {ld ? <h2>loading...</h2> : children}
    </TunContext.Provider>
  );
};
