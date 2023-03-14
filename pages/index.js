import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import React, { Suspense, useEffect } from "react";
import Main from "../components/Main.jsx";
const MainIndex = React.lazy(() => import("../components/MainIndex"));

// import MainIndex from "../components/MainIndex.jsx";
import SideBar from "../components/SideBar";
import Test from "../components/Test.jsx";
export default function Home() {
  console.log(process.env);
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <SideBar />
        <Suspense fallback={<Test/>}>
          <Main insert={<MainIndex />} />
        </Suspense>
      </div>
    </div>
  );
}
