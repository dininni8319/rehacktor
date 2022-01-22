import './App.css';

import Home from './Components/Views/Home/Home';
import Game from './Components/Views/Game/Game';
import Search from './Components/Views/Search/Search';

import Navbar from './Components/UI/Navbar/Navbar';
import Footer from './Components/UI/Footer/Footer';

import Sign from './Components/Views/Sign/Sign';
import Profile from './Components/Views/Profile/Profile';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './Contexts/Auth/index';
import { ConfigProvider } from './Contexts/Config/index';
import { StreamingProvider } from './Contexts/Streaming/index'
import Stream from './Components/Views/Stream/Stream';

//Utilities
import ProtectedRoute from './Components/Utilities/ProtectedRoute';
import Streamers from './Components/Views/Streamers/Streamers';
import Join from './Components/Views/Join/Join';

function App() {

  return (
      <ConfigProvider>
        <AuthProvider>
          <StreamingProvider>
            <Router>
              <Navbar />

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search/:genre/:num' element={<Search />} />
                <Route path='/game/:slug' element={<Game />} />
                <Route path='/sign' element={<Sign />} />
                <Route 
                  path='/profile' 
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
          </StreamingProvider>

        </AuthProvider>
      </ConfigProvider>
  );
}

export default App;
