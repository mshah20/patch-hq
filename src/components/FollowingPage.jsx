import GameCard from './GameCard';
import './FollowingPage.css';
import Navbar from './Navbar';
import { useState } from 'react';

const handleKeyDown = (e) => {
    if(e.code === "Enter") {
//         // handleSearch();
    }
}

const FollowingPage = ({ cookies, setCookie, removeCookie }) => {
    const [gameInput, setGameInput] = useState('');
    const [showFollowedGames, setShowFollowedGames] = useState(true);

    const listFollowedGames = (followedGamesObject) => {
        return Object.entries(followedGamesObject).map(([key, _]) => {
            return <GameCard key={key} cookies={cookies} setCookie={setCookie} game={key} isFollowed={true} />
        })
    }

    return (
        <>
            <Navbar />

            <div className='following-page-container'>
                <div className='game-input-container'>
                    <input 
                        className='game-input'
                        value={gameInput}
                        onChange={(e) => {setGameInput(e.target.value)}}
                        onKeyDown={handleKeyDown}
                        placeholder='Find a game...'
                    />
                </div>

                <div className='following-page-subheader-container'>
                    <h2 className='following-page-subheader'>Following</h2>
                    <hr className='subheader-divider-with-expand' />
                    <span className='material-symbols-outlined icon'
                        onClick={() => {setShowFollowedGames(!showFollowedGames)}}
                    >expand_more</span>
                    <span className='material-symbols-outlined icon' 
                        title='Remove All Followed Games'
                        onClick={() => {removeCookie('followedGamesAndColors')}}
                    >delete</span>
                </div>

                {showFollowedGames && (
                    <div className='followed-games-container'>
                        {cookies.followedGamesAndColors && (listFollowedGames(cookies.followedGamesAndColors))}
                    </div>
                )}
                
                <div className='following-page-subheader-container'>
                    <h2 className='following-page-subheader'>Top Games</h2>
                    <hr className='subheader-divider-without-expand' />
                </div>

                <div className='top-games-container'>
                <GameCard game='Fortnite' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='Call of Duty: MWIII' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='Call of Duty: Warzone' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='Rainbow Six Siege' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='The Crew Motorfest' cookies={cookies} setCookie={setCookie} />
                </div>
            </div>
        </>
    );
}
 
export default FollowingPage;