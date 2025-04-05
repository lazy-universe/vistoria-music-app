import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, ProfileCompleted, PublicRoute } from "./protectedRoute";

import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import DashBoard from "../pages/DashBoard";
import LandingPage from "../pages/LandingPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Why using Navigate ? as without it user will see flash of prev content and url will display something else */}
        <Route path="*" element={<NotFound />} />
        
        <Route element={<PublicRoute />} >
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProfileCompleted />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
