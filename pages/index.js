import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import React, { Suspense, useEffect } from "react";
const Main = React.lazy(() => import("../components/Main.jsx"));
const MainIndex = React.lazy(() => import("../components/MainIndex"));
const SideBar = React.lazy(() => import("../components/SideBar"));
import Test from "../components/Test.jsx";
export default function Home() {
  console.log(process.env);
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <Suspense fallback={<Test />}>
          <SideBar />
          <Main insert={<MainIndex />} />
        </Suspense>
      </div>
    </div>
  );
}
