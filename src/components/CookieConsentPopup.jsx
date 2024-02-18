import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CookieConsentPopup = ({ setCookie }) => {
    const [showCookiePopup, setShowCookiePopup] = useState(true);

    return (
        <>
            { showCookiePopup && 
                (<div id='cookie-consent-popup-container' className='border-t-2 border-black bg-white px-3 h-16 w-full fixed bottom-0 flex items-center justify-between'>
                    <p>We use cookies to save any selections you make. By using our website, you agree to our usage of cookies.</p>
                    <div id='cookie-consent-popup-options' className='flex center'>
                        {/* <b id='cookie-consent-popup-accept-btn' className='transitional-all ease-in-out duration-200 cursor-pointer py-1 px-2.5 my-0 mx-2.5'
                            onClick={() => {setCookie('consent', true)}}
                        >Accept</b> */}
                        
                        <FontAwesomeIcon icon={faXmark} onClick={() => {setShowCookiePopup(false)}}/>
                    </div>
                </div>
                )
            }
        </> 
    );
}
 
export default CookieConsentPopup;