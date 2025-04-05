import { Button } from "../components/style";
import { useNavigate, Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";


const DashBoard = () => {
  const navigate = useNavigate();

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
      <Header />
      <main>
        <Link to="/profile">move to profile</Link>
        <h1>Welcome to the Dashboard</h1>
        <p>
          This is the dashboard where you can manage your account and listen to
          what you love.
        </p>
        <Button onClick={handleLogout}>Log Out</Button>
      </main>
      <Footer />
    </>
  );
};

export default DashBoard;
