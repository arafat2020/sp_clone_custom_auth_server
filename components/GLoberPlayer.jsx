import { Close } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { TunContext } from "../provider/tuneprovider";
import WebPlayer from "./WebPlayer";
import SpotifyPlayer from "react-spotify-web-playback";

function GLoberPlayer() {
  const [mode, setMode] = useState("preview");
  const { track, setTrack } = useContext(TunContext);
  console.log(track);
  const {  session } = useContext(TunContext);
  return (
    <div
      className={`w-screen absolute bottom-0 left-0 glass_bg2  ${
        !track && "hidden"
      } h-[150px] z-20`}
    >
      <div className="flex justify-between p-1 items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setMode("preview")}
            className={`bg-green-500 ${
              mode === "preview" && "text-green-200"
            } px-2 font-sans font-semibold rounded-full`}
          >
            Prevew
          </button>
          <button
            onClick={() => setMode("play")}
            className={`bg-green-500 ${
              mode !== "preview" && "text-green-200"
            } px-2 font-sans font-semibold rounded-full`}
          >
            Play
          </button>
        </div>
        <button
          className="bg-green-500 rounded-full p-1"
          onClick={() => setTrack("")}
        >
          <Close />
        </button>
      </div>
      <div className="flex flex-wrap items-center w-full overflow-x-scroll scrollbar-hide justify-around">
        {mode === "preview" && (
          <div className="w-[95%]">
            <WebPlayer uri={`spotify:track:${track && track}`} />
          </div>
        )}
        {mode !== "preview" && (
          <div className="w-full">
            <SpotifyPlayer
              styles={{ bgColor: "#242424" }}
              token={session?.accessToken}
              uris={[`spotify:track:${track && track}`]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GLoberPlayer;
