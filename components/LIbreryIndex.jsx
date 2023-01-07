import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import useSaved from "../hooks/getSaved";
import Card3 from "./Card3";
import CardLoader2 from "./sceletonLoader/CardLoader2";

function LIbreryIndex() {
    const {push} = useRouter()
  const { data: session } = useSession();
  const { saved, loading } = useSaved({ token: session?.user?.accessToken });
  console.log(saved);
  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-hide">
      {loading ? (
        <Skeleton variant="text" sx={{fontSize:'1.5rem',width:'400px'}}/>
      ) : (
        <h1 className="text-white text-2xl m-4 capitalize font-bold font-sans">
          {saved?.length === 0 ? "No Track found" : "Saved Track "}
        </h1>
      )}
      <div className="w-full flex flex-wrap items-center justify-around">
      {loading ? (
          <CardLoader2 limit={4} />
        ) : (
          saved?.map((e) => {
            return (
              <div
                key={e.id}
                onClick={() => {
                  push(`/track/${e.track?.id}`);
                }}
                className='cursor-pointer'
              >
                <Card3
                  key={e.id}
                  img={e.track.album.images[2].url}
                  title={e.track.artists[0].name}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default LIbreryIndex;
