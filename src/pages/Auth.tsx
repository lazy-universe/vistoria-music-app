import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { Button } from "../components/style";
// import { useAuthStore } from "../utils/useAuthStore";

const Auth = () => {
  // const login = useAuthStore((state) => state.login);
  // let isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endPoint = isLogin ? "login" : "register";

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/${endPoint}`,
        { email, password },
        { timeout: 10000 } // Auto-abort if it takes longer than 10 seconds
      );
      
      const data = response.data;
      // if (!data) throw new Error(data.message || "Authentication Failed");
      // console.log("Response Status:", response.status);
      // console.log("Response Data:", data.message);
      // console.log("Token", data.token);
      // console.log("complete-profile:", data.profileCompleted);
      // console.log("username", data.username);
      // console.log("avatar", data.avatar);

      // login({
      //   avatar: data.avatar,
      //   username: data.username,
      //   email: email,
      //   token: data.token,
      // });
      // isAuthenticated(data.profileCompleted == "true");

      localStorage.setItem("email", email);  // neccesity ?
      localStorage.setItem("token", data.token);
      localStorage.setItem("profileCompleted", data.profileCompleted); // Store profile completion status      
      if(data.username) localStorage.setItem("username", data.username);
      if(data.avatar) localStorage.setItem("avatar", data.avatar);

      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          setError("Time limit exceeded, try again!");
        } else {
          setError(err.response?.data?.message || "Authentication failed");
        }
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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
        <div className="left-login bg-text h-4/5 w-2/5 rounded-[48px] p-4 flex flex-col gap-8">
          {error && <h1 className="text-center text-2xl text-accent">ERROR</h1>}
          {error && <h2 className="text-red-500 bg-text">{error}</h2>}
        </div>
        <div className="right-login h-4/5 w-2/5 flex flex-col items-center justify-center gap-12">
          <h1 className="text-center text-3xl bold font-poppins">
            {isLogin ? "Login Credentials" : "Sign Up Credentials"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="h-3/5 w-3/5 flex flex-col justify-center gap-4 relative"
          >
            <input
              type="email"
              className="h-9 border-1 p-2 focus:outline-0"
              placeholder="Enter your Email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="h-9 border-1 p-2 focus:outline-0"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex flex-col gap-1 text-sm font-inter text-text/90">
              <p className="cursor-pointer text-right hover:underline">
                Forgot Password?
              </p>
              <p
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer text-right hover:underline"
              >
                {isLogin ? "New User? Sign Up" : "Back to Login"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="mx-6" type="submit" disabled={loading}>
                {loading ? "Taking off..." : "Lets's Dive In"}
              </Button>
              <p
                onClick={() => navigate("/")}
                className="text-center cursor-pointer hover:underline"
              >
                Go Back?
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Auth;
