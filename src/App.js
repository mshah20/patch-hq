import CookieConsentPopup from './components/CookieConsentPopup';
import FollowingPage from './components/FollowingPage';
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['consent', 'followedGamesAndColors']);

  return (
    <div className='w-[100vw] max-w-full bg-slate-900 m-0 p-0 box-border scroll-smooth font-questrial'>
      <Router>
        <Routes>
          <Route path='/' 
            element={<HomePage
              cookies={cookies}
            />} />
          <Route path='/following' 
            element={<FollowingPage 
              cookies={cookies} 
              setCookie={setCookie} 
              removeCookie={removeCookie}  
            />} />
        </Routes>
      </Router>
      {!cookies.consent && 
        <CookieConsentPopup setCookie={setCookie} />
      }
    </div>  
  );
}

export default App;
