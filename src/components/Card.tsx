type CardProps = {
    title: string;
    description: string;
}

export const Card = ({title, description}: CardProps)  => {
  return (
    <div className="bg-text cursor-pointer shadow-md rounded-lg p-4">
      <h2 className="text-xl text-gray-500 font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

interface TrackProps {
  name: string;
  artist: string;
  albumImage: string;
  previewUrl?: string;
  onClick: () => void;
}

export const TrackCard: React.FC<TrackProps> = ({ name, artist, albumImage, previewUrl, onClick}) => {
  return (
    <div className={` ${!previewUrl ? "cursor-pointer" : "cursor-default" } bg-accent p-4 rounded-lg shadow-md flex items-center gap-4 w-full max-w-md backdrop-blur-md`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling to parent elements
        onClick();
      }}
    >
      <img src={albumImage} alt={name} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex flex-col flex-grow">
        <h2 className="text-white font-semibold">{name}</h2>
        <p className="text-gray-300 text-sm">by {artist}</p>
        {previewUrl && (
          <audio controls className="mt-2">
            <source src={previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};
