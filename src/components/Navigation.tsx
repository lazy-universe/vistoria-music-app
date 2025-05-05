import { useNavigate } from "react-router-dom";
import { QuickLink } from "./style";
import { useEffect, useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const [profileCompleted, setProfileCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchProfileCompleted =
      localStorage.getItem("profileCompleted") == "true";
    setProfileCompleted(fetchProfileCompleted);
  }, []);

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
        <QuickLink onClick={() => navigate("/chat")}> chat </QuickLink>
      </div>
    </>
  );
};

export default Navigation;
