import './CookieConsentPopup.css';
import '../FontsAndIcons.css';
import { useState } from 'react';

const CookieConsentPopup = ({ setCookie }) => {
    const [showCookiePopup, setShowCookiePopup] = useState(true);

    return (
        <>
            { showCookiePopup && 
                (<div className='cookie-consent-popup-container'>
                    <p>We use cookies to save any selections you make. By using our website, you agree to our usage of cookies.</p>
                    <div className='cookie-consent-popup-options'>
                        {/* <b className='cookie-consent-popup-accept-btn'
                            onClick={() => {setCookie('consent', true)}}
                        >Accept</b> */}
                        <span className="material-symbols-outlined"
                            onClick={() => {setShowCookiePopup(false)}}
                        >close</span>
                    </div>
                </div>
                )
            }
        </> 
    );
}
 
export default CookieConsentPopup;