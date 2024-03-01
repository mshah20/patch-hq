import GameCard from './GameCard';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FollowingPage = ({ cookies, setCookie, removeCookie }) => {
    const [showFollowedGames, setShowFollowedGames] = useState(true);
    const [gameOptions, setGameOptions] = useState([]);
    const [isGameOptionsLoading, setIsGameOptionsLoading] = useState(true);

    const listFollowedGames = (followedGamesObject) => {
        return Object.entries(followedGamesObject).map(([key, _]) => {
            return <GameCard key={key} cookies={cookies} setCookie={setCookie} game={key} isFollowed={true} />
        })
    }

    const addFollowedGame = async (game) => {
        try {
            const { data } = await axios.get(`https://patch-hq-api.onrender.com/color?game=${game}`);
            setCookie('followedGamesAndColors', {...cookies.followedGamesAndColors, [`${game}`]: data.color})
        }
        catch (e) {
            console.error(e);
        }
    }

    const fetchAllGames = async () => {
        try {
            const { data } = await axios.get('https://patch-hq-api.onrender.com/all-games');

            const options = data.map(({game}) => {
                return { value: game, label: game }
            })
            setGameOptions(options);
            setIsGameOptionsLoading(false);
        }
        catch (e) {
            console.error(e);
        }   
    }

    useEffect(() => {
        fetchAllGames();
    }, [])

    return (
        <>
            <Navbar />

            <div id='following-page-container' className='min-h-[100vh] text-slate-50 flex flex-col items-center'>
                <div id='game-input-container' className='my-12'>
                    <Select
                        id='game-input'
                        className='min-w-96 max-w-[80vw] h-10'
                        options={gameOptions}
                        maxMenuHeight={160}
                        onChange={(e) => {addFollowedGame(e.value)}}
                        placeholder='Find a game...'
                        isLoading={isGameOptionsLoading}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral0: '#334155', //background bg-slate-700
                                primary25: '#1e293b', //option-hover bg-slate-800
                                neutral50: '', //placeholder
                                neutral80: '#f8fafc', //text bg-slate-50
                            }
                        })}
                    />
                </div>

                <div id='following-page-subheader-container' className='m-8 w-[65vw] flex items-center'>
                    <h2 id='following-page-subheader' className='min-w-fit text-xl'>Following</h2>
                    <hr id='subheader-divider' className='mx-1.5 w-[90%] h-[2px] bg-slate-300' />
                    <FontAwesomeIcon icon={faChevronDown} title='Expand/Minimize' onClick={() => {setShowFollowedGames(!showFollowedGames)}} className='mx-1 text-slate-500 cursor-pointer select-none text-lg' />
                    <FontAwesomeIcon icon={faTrash} title='Empty Followed Games' onClick={() => {removeCookie('followedGamesAndColors')}} className='mx-1 text-slate-500 cursor-pointer select-none text-lg' />
                </div>

                {showFollowedGames && (
                    <div className='followed-games-container'>
                        {cookies.followedGamesAndColors && (listFollowedGames(cookies.followedGamesAndColors))}
                    </div>
                )}
                
                <div id='following-page-subheader-container' className='m-8 w-[65vw] flex items-center'>
                    <h2 id='following-page-subheader' className='min-w-fit text-xl'>Top Games</h2>
                    <hr id='subheader-divider' className='ml-6 w-full h-[2px] bg-slate-300' />
                </div>

                <div className='top-games-container'>
                    <GameCard game='Fortnite' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='Call of Duty MWIII' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='Call of Duty Warzone' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='Rainbow Six Siege' cookies={cookies} setCookie={setCookie} />
                    <GameCard game='The Crew Motorfest' cookies={cookies} setCookie={setCookie} />
                </div>
            </div>
        </>
    );
}
 
export default FollowingPage;