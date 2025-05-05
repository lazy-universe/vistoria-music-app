import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, ProfileCompleted, PublicRoute } from "./protectedRoute";

import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import Search from "../pages/Search";
import Layout from "../pages/Layout";
import Chat from "../pages/Chat";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Why using Navigate ? as without it user will see flash of prev content and url will display something else */}
        <Route path="*" element={<NotFound />} />

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route element={<ProfileCompleted />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
