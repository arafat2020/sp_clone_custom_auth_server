import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { LOGIN_URL_2 } from "../lib/spotify";
import { TunContext } from "../provider/tuneprovider";

function Login({ provider }) {
  const {session:auth} = useContext(TunContext) 
  const router = useRouter();
  useEffect(() => {
    if (auth) {
      const reDirect = () => router.push("/");
      reDirect();
    }
  }, []);
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <img
          className="w-[300px] h-[120px]"
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
        />
        {/* {Object.values(provider).map((e) => {
          return (
            <button
              className="bg-green-500 text-white font-semibold p-3 rounded-md"
              key={e.id}
            >
              Login with {e.name}
            </button>
          );
        })} */}
        <button className="bg-green-500 text-white font-semibold p-3 rounded-md">
          <a href={LOGIN_URL_2}>Login With Spotify</a>
        </button>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const provider = await getProviders();
//   return {
//     props: {
//       provider,
//     },
//   };
// }

export default Login;
