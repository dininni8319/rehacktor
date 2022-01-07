import './App.css';
import Home from './Components/Views/Home/Home';
import Game from './Components/Views/Game/Game';
import Search from './Components/Views/Search/Search';

import Navbar from './Components/UI/Navbar/Navbar';
import Footer from './Components/UI/Footer/Footer';

import Sign from './Components/Views/Sign/Sign';
import Profile from './Components/Views/Profile/Profile';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './Contexts/Auth/index';
import { ConfigProvider } from './Contexts/Config/index';

function App() {

  return (
      <ConfigProvider>
        <AuthProvider>
          <Router>
            <Navbar />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:genre/:num' element={<Search />} />
              <Route path='/game/:slug' element={<Game />} />
              <Route path='/sign' element={<Sign />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>

            <Footer />
            </Router>
        </AuthProvider>
      </ConfigProvider>
  );
}

export default App;
