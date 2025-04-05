import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/style";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endPoint = isLogin ? "login" : "register";

    const authController = new AbortController();
    const authTimeoutId = setTimeout(() => {
      authController.abort(); // Abort the fetch request
      setError("Time limit exceeded, try again!");
      setLoading(false);
    }, 10000);

    try {
      console.log(isLogin, endPoint, email, password);
      const response = await fetch(
        `http://localhost:5000/api/auth/${endPoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          signal: authController.signal,
        }
      );

      clearTimeout(authTimeoutId); // Clear the timeout if the request completes in time

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication Failed");

      // console.log("Response Status:", response.status);
      // console.log("Response Data:", data.message);
      // console.log("Token", data.token);
      // console.log("complete-profile:", data.profileCompleted);
      // console.log("username", data.username);
      // console.log("avatar", data.avatar);

      localStorage.setItem("email", email);  // neccesity ?
      localStorage.setItem("token", data.token);
      localStorage.setItem("profileCompleted", data.profileCompleted); // Store profile completion status      
      if(data.username) localStorage.setItem("username", data.username);
      if(data.avatar) localStorage.setItem("avatar", data.avatar);

      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
      clearInterval(authTimeoutId);
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
