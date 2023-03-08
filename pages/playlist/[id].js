import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Main from "../../components/Main";
import PLaylistIndex from "../../components/PLaylistIndex";
import SideBar from "../../components/SideBar";
import useGetPLayList from "../../hooks/getPLayList";
import { TunContext } from "../../provider/tuneprovider";

function Playlist() {
  const router = useRouter();
  const { id } = router.query;
  const { session} = useContext(TunContext)
  const {playist,loading,err} = useGetPLayList({
    token:session?.accessToken,
    id:id
  })
//   console.log((playist));
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <SideBar />
        <Main insert={<PLaylistIndex obj={playist} loading={loading}/>} />
      </div>
    </div>
  );
}

export default Playlist;
