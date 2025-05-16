import { useEffect, useState } from "react";
import { useAuthStore } from "../utils/useAuthStore";

interface Track {
  name: string;
  preview_url: string | undefined;
  artist: string;
  image: string;
  external_url: string;
}

const Player = () => {
  const player = useAuthStore((state) => state.player);
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    // const storedTrack = localStorage.getItem("activeTrack");
    // if (storedTrack) {
    //   console.log("Stored track:", storedTrack);
    //   setTrack(JSON.parse(storedTrack));
    // }

    // Optional: Listen for manual updates in localStorage (like across tabs)
    const handleTrackSelected = () => {      
      // const updated = localStorage.getItem("activeTrack");
      const updated = player;
      if (updated) setTrack(updated);
    };

    window.addEventListener("trackSelected", handleTrackSelected);
    return () =>
      window.removeEventListener("trackSelected", handleTrackSelected);
  }, [player]);

  if (!track)
    return (
      <div className="h-2/3 m-2 w-full border-accent border-2 rounded-2xl flex text-center items-center justify-center">
        No song is playing, <br /> play a song to display here!
      </div>
    );

  return (
    <>
      <div className="h-3/5 w-full mt-4 flex flex-col bottom-4 left-4 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md items-center gap-4 text-white">
        <img
          src={track?.image}
          alt="cover"
          className="w-[20vw] h-[20vw] rounded"
        />
        <div className="flex flex-col w-full">
          <p className="font-semibold text-center truncate">{track?.name}</p>
          <p className="text-sm text-gray-300 text-center truncate">
            {track?.artist}
          </p>
          <audio
            controls
            autoPlay
            src={track?.preview_url}
            className="mt-4 w-full"
          />
        </div>

        <div className="text-sm text-gray-300 text-center">
          <span className="underline">{track?.name}</span> is playing now! <br />{" "}
          You can listen to this song <a className="underline" target="_blank" rel="noopener noreferrer" href={track.external_url}>here</a>
        </div>
      </div>
    </>
  );
};

export default Player;
