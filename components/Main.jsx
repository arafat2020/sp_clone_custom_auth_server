import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { truncateString } from "../lib/truncate";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { TunContext } from "../provider/tuneprovider";
import useMe from "../hooks/useMe";
import { useRouter } from "next/router";

function Main({ insert }) {
  const {auth,session} = useContext(TunContext)
  const router = useRouter()
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  useEffect(() => {
   if(auth === "unauthenticated"  || !session){
    const redirect =()=> router.push('/login')
     redirect()
   }
    // document.getElementById("scroll_down").addEventListener("click", () => {
    //   let pix = 0 + 1;
    //   console.log(pix);
    //   myDiv[0].scrollTo(0, myDiv[0].scrollHeight);
    // });
  }, [auth]);
  const { setSide,session:ss,setsession } = useContext(TunContext);
  const {me,err} = useMe({token:ss?.accessToken})
  console.log(me,err);
  return (
    <div
      className={`w-[100%] sm:w-[70%] h-[100%] bg-[#0c0c0c] overflow-y-scroll scrollbar-hide main`}
    >
      <div
        onClick={() => setSide(true)}
        className="sm:hidden absolute flex items-center justify-between top-1 left-1 cursor-pointer z-20"
      >
        <span className="text-[#e2dbdb] ">
          <LibraryMusicIcon
            sx={{ fontSize: "30px", color: "rgb(34 197 94)" }}
          />
        </span>
        <span className="text-green-500 text-3xl font-bold">Tune</span>
      </div>
      <div
        onClick={async() => {
          await localStorage.removeItem("sp_user_data")
          await setsession(null)
          router.push('/login')
        }}
        className="absolute top-3 right-3 flex glass glass_bg2 space-x-2 z-10 rounded-full sm:w-[200px] p-1"
      >
        <img
          className="w-[30px] h-[30px]  rounded-full border"
          src={me?.images[0].url}
          alt="img"
          loading="lazy"
        />
        <button
          className="text-white hidden sm:inline"
          onClick={async() => {
            await localStorage.removeItem("sp_user_data")
            await setsession(null)
            router.push('/login')
          }}
        >
          {me && truncateString(me.display_name, 10)}
        </button>
      </div>
      {/* <button id="scroll_down" className="absolute right-2 bottom-52 z-10 ">
        <ArrowDownwardIcon />
      </button> */}
      {insert}
    </div>
  );
}

export default Main;
