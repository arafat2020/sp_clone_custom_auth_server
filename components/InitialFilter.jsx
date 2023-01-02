import { useSession } from "next-auth/react";
import useFilter from "../hooks/getFilter";
import useInitialSearch from "../hooks/initialSearch";
import useSearch from "../hooks/searchTrack";
import AlbumReasult from "./AlbumReasult";
import ArtistsReasult from "./ArtistsReasult";
import PlayListReasult from "./PlayListReasult";
import SongReasult from "./SongReasult";

function InitialFilter({ term, filter }) {
  const { data: session } = useSession();
  const { filterSarch, loading, err } = useFilter({
    token: session?.user?.accessToken,
    term: term,
    limit: 20,
    filter: filter,
  });
  console.log(filterSarch, err);
  return (
    <div className="w-full">
      {filter === "track" && (
        <SongReasult reasult={filterSarch?.tracks?.items} loading={loading} />
      )}
      {filter === "artist" && (
        <ArtistsReasult
          reasult={filterSarch?.artists?.items}
          loading={loading}
        />
      )}
      {filter === "album" && (
        <AlbumReasult reasult={filterSarch?.albums?.items} loading={loading} />
      )}
      {filter === "playlist" && (
        <PlayListReasult
          reasult={filterSarch?.playlists?.items}
          loading={loading}
        />
      )}
    </div>
  );
}

export default InitialFilter;
