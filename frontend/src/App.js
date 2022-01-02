import './App.css';
import Home from './Components/Views/Home/Home';
import Game from './Components/Views/Game/Game';
import Search from './Components/Views/Search/Search';
import Navbar from './Components/UI/Navbar/Navbar';
import Footer from './Components/UI/Footer/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/game/:slug' element={<Game/>} />
        </Routes>

        <Footer />

      </Router>
  );
}

export default App;
