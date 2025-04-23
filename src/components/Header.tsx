import { useEffect, useState } from "react";
import { Button } from "../components/style";
// import { useNavigate } from "react-router-dom";

function Header() {
  const [greeting, setGreeting] = useState("Hey there,");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);

  const handleGreeting = (currTime: number) => {
    if (currTime >= 4 && currTime < 12) {
      setGreeting("Good Morning,");
    } else if (currTime >= 12 && currTime < 17) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Evening,");
    }
  };

  const handleMenu = () => {
    // Handle menu click here
    alert("Menu will be implemented soon!");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) setAvatar(storedAvatar);

    const currTime = new Date().getHours();
    handleGreeting(currTime);
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 p-4 px-6 bg-primary-light rounded-full shadow-md text-text">
      <div className="flex items-center gap-4">
        {isZoomed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setIsZoomed(false)}
          >
            <img
              src={avatar}
              alt="Zoomed Profile"
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        )}

        <img
          src={avatar}
          alt="profile-pic"
          className="h-[48px] w-[48px] rounded-full cursor-pointer"
          onClick={() => setIsZoomed(true)}
        />

        {/* <img src={avatar} alt="profile-pic" onClick={handleZoom} className="h-14 w-14 rounded-full cursor-pointer " /> */}
        <div>
          <h1>{greeting}</h1>
          <h1 className="text-2xl">{username}</h1>
        </div>
      </div>
      <div className="">
        <form action="">
          <input className="h-[40px] mr-1 p-4 border-1 rounded-lg outline-none" type="text" />
          <Button>search</Button>
        </form>
      </div>
      <button
        className="cursor-pointer text-sm hover:underline"
        onClick={handleMenu}
      >
        Hamburger
      </button>
    </header>
  );
}

export default Header;
