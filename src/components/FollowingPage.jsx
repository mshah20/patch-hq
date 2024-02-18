import GameCard from './GameCard';
import Navbar from './Navbar';
import { useState } from 'react';
import { patches } from '../AllPatches';
import Select from 'react-select';
import { defaultColors } from '../DefaultColors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';

const FollowingPage = ({ cookies, setCookie, removeCookie }) => {
    const [showFollowedGames, setShowFollowedGames] = useState(true);
    let gameOptions = [];

    const listFollowedGames = (followedGamesObject) => {
        return Object.entries(followedGamesObject).map(([key, _]) => {
            return <GameCard key={key} cookies={cookies} setCookie={setCookie} game={key} isFollowed={true} />
        })
    }

    const addFollowedGame = (game) => {
        setCookie('followedGamesAndColors', {...cookies.followedGamesAndColors, [`${game}`]: defaultColors[game]})
    }

    Object.keys(patches).map((game) => (
        gameOptions.push({ 'value': game, 'label': game })
    ))

    return (
        <>
            <Navbar />

            <div id='following-page-container' className='flex flex-col items-center'>
                <div id='game-input-container' className='my-12'>
                    <Select
                        id='game-input'
                        className='min-w-96 max-w-[80vw] h-10'
                        options={gameOptions}
                        maxMenuHeight={160}
                        onChange={(e) => {addFollowedGame(e.value)}}
                        placeholder='Find a game...'
                    />
                </div>

                <div id='following-page-subheader-container' className='m-8 w-[65vw] flex items-center'>
                    <h2 id='following-page-subheader' className='min-w-fit font-bold'>Following</h2>
                    <hr id='subheader-divider' className='mx-1.5 w-[90%] h-[2px] bg-slate-300' />
                    <FontAwesomeIcon icon={faChevronDown} title='Expand/Minimize' onClick={() => {setShowFollowedGames(!showFollowedGames)}} className='mx-1 text-slate-500 cursor-pointer select-none text-xl' />
                    <FontAwesomeIcon icon={faTrash} title='Empty Followed Games' onClick={() => {removeCookie('followedGamesAndColors')}} className='mx-1 text-slate-500 cursor-pointer select-none text-xl' />
                </div>

                {showFollowedGames && (
                    <div className='followed-games-container'>
                        {cookies.followedGamesAndColors && (listFollowedGames(cookies.followedGamesAndColors))}
                    </div>
                )}
                
                <div id='following-page-subheader-container' className='m-8 w-[65vw] flex items-center'>
                    <h2 id='following-page-subheader' className='min-w-fit font-bold'>Top Games</h2>
                    <hr id='subheader-divider' className='ml-6 w-full h-[2px] bg-slate-300' />
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