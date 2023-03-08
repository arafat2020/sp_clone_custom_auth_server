import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useEffect } from "react";
import Main from "../components/Main.jsx";
import MainIndex from "../components/MainIndex.jsx";
import SideBar from "../components/SideBar";
export default function Home() {
  
  console.log(process.env);
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex h-[100%]">
        <SideBar />
        <Main insert={<MainIndex />} />
      </div>
    </div>
  );
}
