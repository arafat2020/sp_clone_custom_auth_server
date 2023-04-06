import { useRouter } from "next/router";
import React from "react";
import Card1 from "./Card1";
import Card3 from "./Card3";

function InitialMAin({ Initialreasult }) {
  const router = useRouter()
  return (
    <div className="w-full">
      <div className="w-full mt-4 flex sm:flex-row flex-col sm:justify-evenly items-center">
        <div className="sm:w-[45%] w-[95%] ">
          <h1 className="text-white text-2xl mb-4 capitalize font-bold font-sans">
            {Initialreasult && "Top result"}
          </h1>
          <div className="w-full h-[250px] glass_bg2 rounded-md flex flex-col justify-evenly ">
            {Initialreasult && (
              <img
                loading="lazy"
                className="w-[92px] ml-5 h-[92px]  rounded-full"
                src={
                  Initialreasult &&
                  Initialreasult.artists?.items[0].images[2].url
                }
                alt="img"
              />
            )}
            <h2 className="text-white text-3xl ml-5  capitalize font-bold font-sans">
              {Initialreasult && Initialreasult.artists?.items[0].name}
            </h2>
            <div className=" ml-5 ">
              <p className="uppercase text-white bg-[#0c0c0c] fit py-1 px-2 rounded-full text-sm  font-semibold font-sans">
                {Initialreasult && Initialreasult.artists?.items[0].type}
              </p>
            </div>
          </div>
        </div>
        <div className="sm:w-[45%] w-[95%] ">
          <h1 className="text-white text-3xl mb-4 capitalize font-bold font-sans">
            {Initialreasult && "Songs"}
          </h1>
          <div className="w-full h-[250px] flex flex-col justify-around">
            {Initialreasult &&
              Initialreasult.tracks?.items.map((e) => {
                return (
                  <Card3
                    key={e.id}
                    sm={true}
                    glass={false}
                    img={e.album.images[2].url}
                    title={e.name}
                    subtitle={e.artists[0].name}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-white text-2xl  mt-1 capitalize font-bold font-sans ml-6">
          {Initialreasult && "Artists"}
        </h1>
        <div className="w-full flex flex-wrap items-center justify-around">
          {Initialreasult &&
            Initialreasult.artists?.items.map((e) => {
              return (
                <Card1
                  key={e.id}
                  artist={true}
                  image={e.images[1]?.url && e.images[1].url}
                  title={e.name}
                  subtitle={e.type}
                />
              );
            })}
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-white text-2xl  mt-1 capitalize font-bold font-sans ml-6">
          {Initialreasult && "Albums"}
        </h1>
        <div className="w-full flex flex-wrap items-center justify-around">
          {Initialreasult &&
            Initialreasult.albums?.items.map((e) => {
              return (
                <div key={e.id} onClick={()=>router.push(`/album/${e.id}`)}>
                  <Card1
                    key={e.id}
                    image={e.images[1]?.url && e.images[1].url}
                    title={e.name}
                    subtitle={`${e.release_date.split("-")[0]}${` . `}${
                      e.artists[0].name
                    }`}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-white text-2xl  mt-1 capitalize font-bold font-sans ml-6">
          {Initialreasult && "PlayLists"}
        </h1>
        <div className="w-full flex flex-wrap items-center justify-around">
          {Initialreasult &&
            Initialreasult.playlists?.items.map((e) => {
              return (
                <Card1
                  key={e.id}
                  image={e.images[1]?.url && e.images[1].url}
                  title={e.name}
                  subtitle={`By ${e.owner?.display_name}`}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default InitialMAin;
