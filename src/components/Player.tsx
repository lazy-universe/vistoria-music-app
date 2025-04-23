import { useEffect, useState } from "react";

interface Track {
  name: string;
  preview_url: string;
  artist: string;
  image: string;
}

const Player = () => {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const storedTrack = localStorage.getItem("activeTrack");
    if (storedTrack) {
      setTrack(JSON.parse(storedTrack));
    }

    // Optional: Listen for manual updates in localStorage (like across tabs)
    const handleStorageChange = () => {
      const updated = localStorage.getItem("activeTrack");
      if (updated) setTrack(JSON.parse(updated));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!track) return <div className="h-2/3 m-2 w-full border-accent border-2 rounded-2xl flex text-center items-center justify-center">No song is playing, <br/> play an song to display here!</div>
  
  return (
    <>
      <div className="fixed bottom-4 left-4 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md flex items-center gap-4 text-white w-72">
        <img src={track.image} alt="cover" className="w-12 h-12 rounded" />
        <div className="flex flex-col w-full">
          <p className="font-semibold truncate">{track.name}</p>
          <p className="text-sm text-gray-300 truncate">{track.artist}</p>
          <audio
            controls
            autoPlay
            src={track.preview_url}
            className="mt-2 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Player;
