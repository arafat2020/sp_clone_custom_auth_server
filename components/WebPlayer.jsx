import React from "react";
import SpotifyPlayer from 'react-spotify-player';
function WebPlayer({uri}) {

  const size = {
    width: "100%",
    height: "100px",
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  return (
    <div className=" w-[90%] z-10">
      {uri && (
        <SpotifyPlayer
        uri={uri}
        size={size}
        view={view}
        theme={theme}
      />
      )}
    </div>
  );
}

export default WebPlayer;
