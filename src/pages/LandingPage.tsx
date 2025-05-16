import { useNavigate } from "react-router-dom";
import { Button, Line } from "../components/style";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="relative h-dvh bg-primary flex flex-col items-center justify-around text-text z-10 gap-12">
      <header className="hero text-center mt-20">
        <h1 className="font-space text-7xl md:text-8xl mb-4 text-secondary/90 tracking-wider hover:scale-105 transition-transform">
          VISTORIA
        </h1>
        <p className="font-inter text-xl md:text-2xl mt-4 text-text/90 text-right">
          Let's Vibe Together
        </p>
      </header>

      <section className="features bg-secondary/95 backdrop-blur-sm h-1/2 w-3/5 rounded-[48px] flex items-center justify-evenly shadow-lg">
        <div className="h-full w-1/2 flex items-center gap-8">
          <div
            className="scroll-bar w-4/5 h-3/5 border-2 border-text/20 
              rounded-3xl hover:border-text/40 transition-colors"
          ></div>
          <div
            className="navigation-bar h-2/5 w-2 border-2 border-text/20 
              rounded-2xl hover:border-text/40 transition-colors"
          ></div>
        </div>
        <div className="flex flex-col gap-8 h-full justify-center">
          <ul className="flex flex-col gap-6 text-2xl font-poppins">
            {["CUT", "SYNC", "VIBE"].map((item) => (
              <li
                key={item}
                className="flex items-center tracking-wider gap-2 hover:text-accent 
              transition-colors cursor-pointer"
              >
                <Line />
                {item}
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate("/login")}> Get Started </Button>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;