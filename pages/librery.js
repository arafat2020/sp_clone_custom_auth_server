import React, { Suspense } from "react";
const LIbreryIndex = React.lazy(()=>import("../components/LIbreryIndex"));
const Main = React.lazy(()=>import("../components/Main"));
import Test from "../components/Test";
const SideBar = React.lazy(() => import("../components/SideBar"));

function Librery() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full text-red-500 flex h-[100%]">
        <Suspense fallback={<Test/>}>
          <SideBar />
          <Main insert={<LIbreryIndex />} />
        </Suspense>
      </div>
    </div>
  );
}

export default Librery;
