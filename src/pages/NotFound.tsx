import { useNavigate } from "react-router-dom";
import "../index.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-extrabold tracking-widest relative">
          <span className="glitch" data-text="404">404</span>
        </h1>
        <p className="text-xl md:text-2xl font-light">Oops! Page Not Found</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-6 py-3 cursor-pointer bg-white text-primary rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}