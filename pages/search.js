
import React, { Suspense, useEffect } from "react";
import Main from "../components/Main";
const SearchIndex = React.lazy(() => import("../components/SearchIndex"));
const SideBar = React.lazy(() => import("../components/SideBar"));
import Test from "../components/Test";

export default function Search() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <Suspense fallback={<Test />}>
          <SideBar />
          <Main insert={<SearchIndex />} />
        </Suspense>
      </div>
    </div>
  );
}
