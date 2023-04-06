import { useRouter } from "next/router";
import { useContext } from "react";
import useCategory from "../hooks/getCategory";
import useGenreSeed from "../hooks/getGenreSeed";
import { TunContext } from "../provider/tuneprovider";
import Card1 from "./Card1";

function GenreIndex() {
  const {session} = useContext(TunContext)
  const router = useRouter();
  const { id } = router.query;
  const { category, err, loading } = useCategory({
    token: session?.accessToken,
    name: id,
  });
  // console.log(category, err);
  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-hide">
      <h2 className="text-xl text-white font-sans font-bold sm:m-5 mt-9 ml-3">
        Playlist for Genre
      </h2>
      <div className="w-full flex flex-wrap items-center justify-around">
        {!loading &&
          category?.map((e) => {
            return (
              <div key={e?.id} onClick={() => router.push(`/playlist/${e.id}`)}>
                <Card1
                  key={e?.id}
                  image={
                    e?.images[0]
                      ? e.images[0].url
                      : "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                  }
                  title={e?.name}
                  subtitle={e?.description}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GenreIndex;
