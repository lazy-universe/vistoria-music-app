import {useState , useEffect} from "react";
import { Outlet } from "react-router-dom";

import Player from "../components/Player";
import Navigation from "../components/Navigation";


const Layout = () => {
  const [profileCompleted, setProfileCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchProfileCompleted = localStorage.getItem("profileCompleted") == "true";
    setProfileCompleted(fetchProfileCompleted);
  }, []);

  return (
    <>
      <main className="flex h-screen w-screen bg-gray-100">
        {/* left portion i want for ever */}
        <section className={`flex flex-col items-baseline gap-1 bg-primary-light text-text w-1/4 p-4 h-full ${!profileCompleted ? "pointer-events-none" : ""}`}>        
        <Navigation/>
        <Player/>
        </section>

        {/* right portion where remaining content would be rendered */}
        <div className = "w-3/4">
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default Layout;
