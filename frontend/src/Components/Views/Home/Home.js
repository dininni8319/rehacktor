import Header from '../../UI/Header/Header';
import Info from '../../UI/Info/Info';
import Call from '../../UI/Call/Call';
import Navbar from '../../UI/Navbar/Navbar';

export default function Home(params) {
    return  (
        <>
          <Navbar />
          <Header />
          <Info />
          <Call />
        </>
    )

}