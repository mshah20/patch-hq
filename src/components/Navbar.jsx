import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return(
        <div id='nav-container' className='flex items-center justify-between py-4 px-7 select-none'>
            <div id='nav-logo' className='flex cursor-pointer' onClick={() => {navigate('/')}}>
                <h1 id='nav-logo-patch'>Patch</h1>
                <h1>HQ</h1>
            </div>
            <div id='nav-links-container' className='flex'>
                <h3 className='py-1 px-4 border-2 border-black rounded-full cursor-pointer font-bold transition-all duration-200 hover:text-white hover:bg-black' onClick={() => {navigate('/')}}>HQ</h3>
                <h3 className='py-1 px-4 ml-7 border-2 border-black rounded-full cursor-pointer font-bold transition-all duration-200 hover:text-white hover:bg-black' onClick={() => {navigate('/following')}}>Following</h3>
            </div>
        </div>
    )
}

export default Navbar;