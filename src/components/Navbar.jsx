import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return(
        <div className='nav-container'>
            <div className='nav-logo'
                onClick={() => {navigate('/')}}
            >
                <h1 className='nav-logo-patch'>Patch</h1>
                <h1>HQ</h1>
            </div>
            <div className='nav-links-container'>
                <h3 onClick={() => {navigate('/')}}>HQ</h3>
                <h3 onClick={() => {navigate('/following')}}>Following</h3>
            </div>
        </div>
    )
}

export default Navbar;