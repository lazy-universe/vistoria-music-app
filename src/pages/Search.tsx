import axios from "axios";
import { useState } from "react";
import { TrackCard } from "../components/Card";
import { useAuthStore } from "../utils/useAuthStore";

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
  preview_url: string | undefined;
  external_urls: {
    spotify: string;
  };
}


const DisplaySearch = () => {
  const setPlayer = useAuthStore((state) => state.setPlayer);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleTrackClick = (track: SpotifyTrack) => {
    console.log('Track clicked:', track);
    const selectedTrack = {
      name: track.name,
      preview_url: track.preview_url,
      artist: track.artists[0].name,
      image: track.album.images[0]?.url,
      external_url: track.external_urls.spotify,
    };

    setPlayer(selectedTrack);
    // const activeTrack = JSON.stringify(selectedTrack);
    // localStorage.setItem("activeTrack", activeTrack);
    // localStorage.setItem("activeTrack", JSON.stringify(selectedTrack));

    // Dispatch a custom event to notify the Player component
    window.dispatchEvent(new Event('trackSelected'));

    // const stored = localStorage.getItem("activeTrack");
    // console.log('Stored track:', stored);
  };
  

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearchTriggered(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/spotify/search",
        {
          params: { q: searchQuery },
        }
      );
      const data = response.data;
      setSearchResults(data.tracks.items);
      console.log(data);
    } catch (err) {
      console.error("Error fetching Spotify search:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-primary transition-all duration-500">
      <div className="flex flex-col items-center w-2/3 py-4 h-9/10 relative">
        {/* H1 with transition instead of removing */}
        <h1
          className={`text-3xl text-center mb-16 text-white transition-all duration-700 transform ${
            searchTriggered
              ? "opacity-0 -translate-y-28 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          Search for your favourite album, track, artist, playlist and many more
          with just one click
        </h1>

        {/* Search Form that shifts up on search */}
        <form
          onSubmit={handleSearch}
          className={`w-1/2 mb-4 focus-within:w-3/5 border-2 hover:shadow-lg focus-within:shadow-accent border-accent rounded-full p-2 px-4 flex items-center gap-4 bg-white/10 backdrop-blur-md shadow-md transition-all duration-700 transform ${
            searchTriggered ? "-mt-32" : "mb-4"
          }`}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything..."
            className="flex-grow bg-transparent text-white placeholder:text-gray-400 border-none focus:outline-none text-base px-2"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
          >
            🔍
          </button>
        </form>

        {/* Search Results */}
        <div
          className={`w-full h-full scrollbar-hide overflow-y-scroll bg-primary-light flex flex-col items-center gap-4 transition-all duration-700 ease-in-out ${
            searchTriggered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y--100"
          }`}
        >
          {/* Inside the return part where you're showing search results */}
          {searchTriggered && (
            loading ? (
              <div className="mt-36 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"></div>
              </div>
            ) : (          
            <div className="w-full mt-8 flex flex-col items-center gap-4 transition-all duration-700 ease-in-out">
              {searchResults.length > 0 ? (
                searchResults.map((track, index) => (
                  <TrackCard
                    key={index}
                    name={track.name}
                    artist={track.artists[0]?.name}
                    albumImage={track.album?.images[1]?.url || ""}
                    previewUrl={track.preview_url || undefined}
                    onClick={() => handleTrackClick(track)}
                  />
                ))
              ) : (
                <p className="text-white text-lg">No results found...</p>
              )}
            </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default DisplaySearch;
