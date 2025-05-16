import { QuickLink } from "./style";
import { useNavigate } from "react-router-dom";
import { initSocket } from "../utils/useSocket";
import { useAuthStore } from "../utils/useAuthStore";

const Navigation = () => {
  const navigate = useNavigate();
  const profileCompleted = useAuthStore((state) => state.user?.profileCompleted);

  return (
    <>
      <div className={`bg-secondary min-h-1/3 flex flex-col justify-center items-center gap-2 rounded-lg shadow-md p-4 w-full ${!profileCompleted ? "blur-[1px]" : ""}`}>
        <h1 className="mb-2 text-xl">Quick navigation links</h1>
        <QuickLink onClick={() => navigate("/dashboard")}>
          {" "}
          Dashboard{" "}
        </QuickLink>
        <QuickLink onClick={() => navigate("/profile")}> Profile </QuickLink>
        <QuickLink onClick={() => navigate("/search")}> Search </QuickLink>
        <QuickLink onClick={() => {initSocket(); navigate("/chat")}}> Chat </QuickLink>
      </div>
    </>
  );
};

export default Navigation;
