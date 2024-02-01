import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Components/Views/Home/Home";
import Game from "./Components/Views/Game/Game";
import Search from "./Components/Views/Search/Search";
import Profile from "./Components/Views/Profile/Profile";
import Sign from "./Components/Views/Sign/Sign";
import Navbar from "./Components/UI/Navbar/Navbar";
import Footer from "./Components/UI/Footer/Footer";
import Stream from "./Components/Views/Stream/Stream";
import Join from "./Components/Views/Join/Join";
import Streamers from "./Components/Views/Streamers/Streamers";

//Utilities
import ProtectedRoute from "./Components/Utilities/ProtectedRoute";

const router = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:genre/:num" element={<Search />} />
          <Route path="/game/:slug" element={<Game />} />
          <Route path="/sign" element={<Sign />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stream/:game_name/:game_id"
            element={
              <ProtectedRoute>
                <Stream />
              </ProtectedRoute>
            }
          />
          <Route
            path="/streamers"
            element={
              <ProtectedRoute>
                <Streamers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/join-room/:room_id"
            element={
              <ProtectedRoute>
                <Join />
              </ProtectedRoute>
            }
          />
        </Routes>
      <Footer />
    </Router>
  );
}

export default router;