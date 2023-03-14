import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Suspense, useEffect } from "react";
import Main from "../components/Main";
const SearchIndex = React.lazy(() => import("../components/SearchIndex"));
import SideBar from "../components/SideBar";
import Test from "../components/Test";

export default function Search() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <SideBar />
        <Suspense fallback={<Test />}>
          <Main insert={<SearchIndex />} />
        </Suspense>
      </div>
    </div>
  );
}
