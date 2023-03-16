import React, { Suspense } from "react";
const Main = React.lazy(() => import("../../components/Main"));
import Test from "../../components/Test";
const SideBar = React.lazy(() => import("../../components/SideBar"));
const TrackIndex = React.lazy(()=>import("../../components/TrackIndex"));

function Track() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <Suspense fallback={<Test/>}>
          <SideBar />
          <Main insert={<TrackIndex />} />
        </Suspense>
      </div>
    </div>
  );
}

export default Track;
