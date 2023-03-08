import { useContext, useEffect, useRef, useState } from "react";
import useCategories from "../hooks/getCategories";
import Card2 from "./Card2";
import SearchIcon from "@mui/icons-material/Search";
import useInitialSearch from "../hooks/initialSearch";
import Initialreasult from "./Initialreasult";
import { useRouter } from "next/router";
import { TunContext } from "../provider/tuneprovider";

export default function SearchIndex() {
  const router = useRouter()
  const {session} = useContext(TunContext)
  const { category, loading, err } = useCategories({
    token: session?.accessToken,
  });
  const [term, setTerm] = useState();
  const {
    initialReasult,
    loading: initailLD,
    err: initialErr,
  } = useInitialSearch({ token: session?.accessToken, term: term });
  const ref = useRef();
  useEffect(() => {
    // const yt_form = document.getElementById("yt_form");

    // yt_form.addEventListener("keypress", (e) => {
    //   if (e.key === "Enter") {
    //     setTerm(ref.current.value);
    //   }
    // });
  },[]);
  console.log(category);
  return (
    <div className="w-full">
      <div className="bg-white w-1/2 p-1 rounded-full ml-4 sm:mt-3 mt-11 flex">
        <div className="cursor-pointer" onClick={()=>setTerm(ref.current.value)}>
          <SearchIcon />
        </div>
        <input
          id="yt_form"
          ref={ref}
          onChange={(e)=>setTerm(e.target.value)}
          type="text"
          className="outline-none w-3/4"
          placeholder="What do you want to listen to?"
        />
      </div>
      {!loading && !term && (
        <h2 className="text-2xl text-white font-sans font-bold m-5">
          Brows All
        </h2>
      )}
      <div className="w-full flex flex-wrap items-center justify-around">
        {!term &&
          category?.map((e) => {
            return (
              <div key={e.id} onClick={()=>router.push(`/genre/${e.id}`)}>
                <Card2 img={e.icons[0].url} title={e.name} />
              </div>
            );
          })}
      </div>
      {term && (
        <Initialreasult
          Initialreasult={initialReasult}
          loading={initailLD}
          term={term}
        />
      )}
    </div>
  );
}
