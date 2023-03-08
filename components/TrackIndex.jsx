import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useAvailableGenreSeeds from "../hooks/getAvailableGenreSeeds";
import useRecomandation from "../hooks/getRecommendations";
import { TunContext } from "../provider/tuneprovider";
import Card3 from "./Card3";
import CardLoader2 from "./sceletonLoader/CardLoader2";
import WebPlayer from "./WebPlayer";

function TrackIndex() {
  const {  session } = useContext(TunContext);

  const { setPlist } = useContext(TunContext);
  const router = useRouter();
  const { id } = router.query;

  const [uri, setUri] = useState(id);

  const { reomandation, loading, err } = useRecomandation({
    token: session?.accessToken,
    id: uri ? uri : id,
  });
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  console.log(reomandation, err);
  return (
    <div
      style={{
        background: `linear-gradient(#${randomColor()},black)`,
        transition:'.4s'
      }}
      className="w-full h-full flex flex-col justify-around items-center glass_bg"
    >
      <div className="w-[100%] h-[80%]  rounded-lg  ">
        <h1 className="sm:text-2xl text-xl text-white font-sans font-bold sm:m-5 mt-9 ml-5">
          Recomended Track
        </h1>
        <div className="w-[100%] h-[100%] overflow-y-scroll scrollbar-hide flex flex-wrap items-center justify-around">
          {loading
            ? <CardLoader2/>
            : reomandation?.map((e) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(`/track/${e.id}`);
                      setPlist(e.context == !null && e.context.uri);
                      setUri(e.id);
                    }}
                    key={e.id}
                  >
                    <Card3
                      title={e.name}
                      img={e.album.images[2]?.url}
                      subtitle={e.album.artists[0].name}
                    />
                  </div>
                );
              })}
        </div>
      </div>
      <WebPlayer  uri={`spotify:track:${uri ? uri : id}`} />
    </div>
  );
}

export default TrackIndex;
