import Header from '../../UI/Header/Header';
import Info from '../../UI/Info/Info';
import Call from '../../UI/Call/Call';
import Featured from '../../UI/Featured/Featured';

export default function Home(params) {
    
  return  (
        <>
          <Header />
          <Info />
          <Featured />
          <Call />
        </>
    )
}