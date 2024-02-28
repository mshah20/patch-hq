import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CookieInfoPopup = ({ trigger, setTrigger }) => {
    return (trigger) ? (
        <div id='cookie-info-popup-background' className='fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-40 flex items-center justify-center z-[1]'>
            <div id='cookie-info-popup-inner' className='px-8 pt-1 pb-8 relative bg-slate-800 text-slate-50 w-96'>
                <button onClick={() => {setTrigger(false)}}>
                    <FontAwesomeIcon icon={faXmark} className='absolute top-4 right-4 text-xl cursor-pointer' />
                </button>

                <h1 className='mb-4 font-bold text-lg text-center'>What are cookies?</h1>
                <p className='bg-slate-700 p-4 rounded-lg'>Cookies are text files that are stored on <b>your</b> device when using a web browser.</p>

                <h1 className='mt-8 mb-4 font-bold text-lg text-center'>What do we use cookies for?</h1>
                <p className="bg-slate-700 p-4 rounded-lg">We <b>only</b> use strictly necessary cookies. These cookies store which games you follow and their respective colors.</p>
            
                <h1 className="mt-8 mb-4 font-bold text-lg text-center">Things we <span className='underline'>do not</span> do:</h1>
                <ul className='list-disc bg-slate-700 p-4 pl-8 rounded-lg'>
                    <li>Collect any data</li>
                    <li>Sell your data</li>
                    <li>Use your data for marketing purposes</li>
                </ul>
            </div>
        </div>
    ) : '';
}
 
export default CookieInfoPopup;