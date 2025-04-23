// import { Button } from "../components/style";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import useDebounce from "../hooks/useDebounce";
// import {fetchSongs} from "../../spotifyService.ts"

// import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "./Profile";
import Carousel from "../components/Carousel";
// import SearchBox from "../components/SearchBox";
// import Card from "../components/Card";
import "./../index.css";
import { QuickLink } from "../components/style";
import DisplaySearch from "./DisplaySearch";
import Player from "../components/Player";

const GenreData = [
  { title: "Lo-Fi", description: "This is the first card." },
  { title: "Chill", description: "Here is the second card." },
  { title: "Study", description: "And this is the third one." },
  { title: "Workout", description: "This is the fourth card." },
  { title: "Indie", description: "Here is the fifth card." },
  { title: "Techno", description: "And this is the sixth one." },
];

const RecentData = [
  { title: "First Card", description: "This is the first card." },
  { title: "Second Card", description: "Here is the second card." },
  { title: "Third Card", description: "And this is the third one." },
  { title: "Fourth Card", description: "This is the fourth card." },
  { title: "Fifth Card", description: "Here is the fifth card." },
  { title: "Sixth Card", description: "And this is the sixth one." },
];

const RecommendedData = [
  { title: "First Card", description: "This is the first card." },
  { title: "Second Card", description: "Here is the second card." },
  { title: "Third Card", description: "And this is the third one." },
  { title: "Fourth Card", description: "This is the fourth card." },
  { title: "Fifth Card", description: "Here is the fifth card." },
  { title: "Sixth Card", description: "And this is the sixth one." },
];

const DashBoard = () => {
  const [profile, setProfile] = useState(false);
  const [greeting, setGreeting] = useState("Hey there,");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // useCallback ensures the function is stable and won't change on every render
  // const onSearch = useCallback(async (query: string) => {
  //   if (query) {
  //     // Example of calling an API function to fetch results
  //     const results = await fetchSongs(query);
  //     setSearchResults(results);
  //   } else {
  //     setSearchResults([]);
  //   }
  // }, []);

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

  const logOutWarning = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      handleLogout();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("avatar");
    localStorage.removeItem("username");
    localStorage.removeItem("profileCompleted");
    navigate("/auth");
  };
  return (
    <>
      <main className="flex h-screen w-screen bg-gray-100">
        <section className="flex flex-col items-baseline gap-1 bg-primary-light text-text w-1/4 p-4 h-full">
        <div className="bg-secondary min-h-1/3 flex flex-col justify-center items-center gap-4 rounded-lg shadow-md p-4 w-full">
          <h1 className="mb-2 text-xl">Quick navigation links</h1>
          <QuickLink onClick={() => {setProfile((prev) => !prev); setDisplaySearch(false)}}>
            {profile ? "Go to Dashboard" : "Go to Profile"}
          </QuickLink>
          <QuickLink onClick={() => {setDisplaySearch((prev) => !prev); setProfile(false)}}>
            {displaySearch ? "Go to Dashboard": "Go to Search"}
          </QuickLink>
          <QuickLink onClick={logOutWarning}>Log Out</QuickLink>
        </div>
        {/* <div className="text-2xl text-accent">is there something wrong ?  </div> */}
        <Player/>
        </section>
        {profile ? (
          <Profile dashBoard={true} closeDashBoard={() => setProfile(false)} />
        ) : ( 
          <section className="flex flex-col gap-4 w-3/4 h-full bg-primary text-text p-4">
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
                  <h1
                    className="text-2xl cursor-pointer border-b-2 border-transparent hover:border-accent transition duration-300"
                    onClick={() => setProfile(true)}
                  >
                    {username}
                  </h1>
                </div>
              </div>
              <div className="">{/*<SearchBox onSearch={onSearch} />*/}</div>
              <button
                className="cursor-pointer text-sm border-b-2 border-transparent hover:border-accent transition duration-300"
                onClick={handleMenu}
              >
                Hamburger
              </button>
            </header>

            {displaySearch ? (
              <DisplaySearch/>
            ) : (
            <div className="max-h-full overflow-y-scroll mb-12 scrollbar-hide scroll-smooth">
              <Carousel heading="Recently Listening . . ." data={RecentData} />
              <Carousel heading="What's your vibe ?" data={GenreData} />
              <Carousel
                heading="Recommended for you !"
                data={RecommendedData}
              />
            </div>
            )}
            <Footer />
          </section>
        )}
      </main>
    </>
  );
};

export default DashBoard;
