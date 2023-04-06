import { useRouter } from "next/router";
import React, { Suspense, useContext } from "react";
import AlbamIndex from "../../components/AlbamIndex";
import Test from "../../components/Test";
import useAlbam from "../../hooks/getAlbam";
import { TunContext } from "../../provider/tuneprovider";
const SideBar = React.lazy(() => import("../../components/SideBar"));
const Main = React.lazy(() => import("../../components/Main"));

function Album() {
  const router = useRouter();
  const { id } = router.query;
  const { session } = useContext(TunContext);
  const { album, loading, err } = useAlbam({
    token: session?.accessToken,
    id: id,
  });
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <Suspense fallback={<Test />}>
          <SideBar />
          <Main insert={<AlbamIndex obj={album} loading={loading} token={session?.accessToken}/> }/>
        </Suspense>
      </div>
    </div>
  );
}

export default Album;
