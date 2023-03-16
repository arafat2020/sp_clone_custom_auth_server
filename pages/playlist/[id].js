import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Suspense, useContext } from "react";
import Test from "../../components/Test";
const Main = React.lazy(() => import("../../components/Main"));
const PLaylistIndex = React.lazy(() =>
  import("../../components/PLaylistIndex")
);
const SideBar = React.lazy(() => import("../../components/SideBar"));
import useGetPLayList from "../../hooks/getPLayList";
import { TunContext } from "../../provider/tuneprovider";

function Playlist() {
  const router = useRouter();
  const { id } = router.query;
  const { session } = useContext(TunContext);
  const { playist, loading, err } = useGetPLayList({
    token: session?.accessToken,
    id: id,
  });
  //   console.log((playist));
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <Suspense fallback={<Test />}>
          <SideBar />
          <Main insert={<PLaylistIndex obj={playist} loading={loading} />} />
        </Suspense>
      </div>
    </div>
  );
}

export default Playlist;
