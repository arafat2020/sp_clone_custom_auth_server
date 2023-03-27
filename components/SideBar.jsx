import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useUSerPlayList from "../hooks/getUSerPlayList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PlayListLoader from "./sceletonLoader/PlayListLoader";
import { useContext } from "react";
import { TunContext } from "../provider/tuneprovider";
import { LOGIN_URL_2 } from "../lib/spotify";



function SideBar() {
  const router = useRouter();
  // const { data: session } = useSession();
  const {session} = useContext(TunContext)
  const { loading, err, playList } = useUSerPlayList({
    token: session?.accessToken,
  });
  // console.log(session,LOGIN_URL_2);
  // // if (!session) return () => router.push("/login");

  // console.log( err )
  // console.log(playList,err,loading);
  return (
    <div className="hidden sm:inline sm:w-[30%] min-w-[189px] h-[100%] bg-black">
      <div className=" ml-5 mt-5 space-y-5">
        <h1>
          <span className="text-[#e2dbdb] text-lg">hacker</span>
          <span className="text-[#e2dbdb] !animate-bounce">
            <MusicNoteIcon sx={{ fontSize: "40px" }} />
          </span>
          <span className="text-green-500 text-3xl font-bold">Tune</span>
        </h1>
        <div className="text-[#e2dbdb]">
          <div onClick={()=>router.push('/')} className=" flex items-center hover:text-white cursor-pointer">
            <div className="p-1">
              <HomeIcon />
            </div>
            <div className="pl-1 font-semibold">
              <p>Home</p>
            </div>
          </div>
          <div onClick={()=>router.push('/search')} className=" flex items-center hover:text-white cursor-pointer">
            <div className="p-1">
              <SearchIcon />
            </div>
            <div className="pl-1 font-semibold">
              <p>Search</p>
            </div>
          </div>
          <div onClick={()=>router.push('/librery')} className=" flex items-center hover:text-white cursor-pointer">
            <div className="p-1">
              <LibraryMusicIcon />
            </div>
            <div className="pl-1 font-semibold">
              <p>Library</p>
            </div>
          </div>
        </div>
        <div className="text-[#e2dbdb] space-y-2">
          <div className=" flex items-center hover:text-white cursor-pointer">
            <div className="p-[2px] bg-slate-300 text-[#2b2a2a] rounded-md">
              <AddIcon fontSize="small" />
            </div>
            <div className="pl-2 font-semibold ">
              <p>Create PLaylist</p>
            </div>
          </div>
          <div className=" flex items-center hover:text-white cursor-pointer">
            <div className="p-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md">
              <FavoriteBorderIcon fontSize="small" />
            </div>
            <div className="pl-2 font-semibold">
              <p>Liked Song</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-[#2e2e2e] h-[2px] w-[80%] border-none mx-auto my-5" />
      <div className="h-[50%] space-y-1 mt-5">
        <div className="text-[#e2dbdb]">
          {loading ? (
            <PlayListLoader />
          ) : (
            playList?.map((e) => {
              return (
                <div key={e.name} onClick={()=>router.push(`/playlist/${e.id}`)} className="cursor-pointer hover:text-white ml-5">
                  <p>{e.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
