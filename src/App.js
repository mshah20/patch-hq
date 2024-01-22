import './App.css';
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
    <>
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
    </>  
  );
}

export default App;
