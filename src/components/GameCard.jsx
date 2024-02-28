import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const GameCard = ({ cookies, setCookie, game, isFollowed }) => {

    const [colorPicker, setColorPicker] = useState({
        displayColorPicker: false,
        color: '#fff'
    })

    const handleClick = () => {
        setColorPicker({...colorPicker, displayColorPicker: !colorPicker.displayColorPicker});
    }

    const handleClose = () => {
        setColorPicker({...colorPicker, displayColorPicker: false})
    }

    const handleChange = (color) => {
        setColorPicker({...colorPicker, color: color.hex})
        setCookie('followedGamesAndColors', {...cookies.followedGamesAndColors, [`${game}`]: color.hex})
    }

    const addFollowedGame = async (game) => {
        try {
            const { data } = await axios.get(`https://patch-hq-api.onrender.com/color?game=${game}`);
            setCookie('followedGamesAndColors', {...cookies.followedGamesAndColors, [`${game}`]: data.color})
        }
        catch (e) {
            console.log(e);
        }
    }

    const removeFollowedGame = (game) => {
        let followedGamesAndColors = cookies.followedGamesAndColors;
        delete followedGamesAndColors[game];
        setCookie('followedGamesAndColors', followedGamesAndColors);
    }

    return (
        <div id='game-card-container' className='bg-slate-700 rounded-lg flex justify-between items-center px-4 mb-5 w-[60vw] h-14'>
            <h3>{game}</h3>

            { isFollowed && (
                <div id='game-card-options-container' className='flex items-center'>
                    
                    <div id='game-card-color-container'>
                        <div id='game-card-color-square-container' title='Game Color' className='flex cursor-pointer items-center select-none' onClick={handleClick}>
                            <div id='game-card-color-square' className='h-7 w-7 rounded-full hover:scale-105 transitional-all duration-200' style={{background: cookies.followedGamesAndColors[game]}} />
                        </div>

                        {colorPicker.displayColorPicker ? 
                            <div id='game-card-color-picker' className='absolute z-[2]'>
                                <div id='game-card-color-picker-closer' onClick={handleClose} className='fixed top-0 right-0 bottom-0 left-0' />
                                <SketchPicker 
                                    color={cookies.followedGamesAndColors[game]}
                                    onChangeComplete={handleChange}
                                />
                            </div> 
                        : null}
                    </div>
                    
                    <button>
                        <FontAwesomeIcon icon={faXmark} title='Remove' className='ml-4 text-xl cursor-pointer' onClick={() => {removeFollowedGame(game)}} />
                    </button>  
                </div>
            )}

            { !isFollowed && (
                <button>
                    <FontAwesomeIcon icon={faPlus} title='Add' className='text-xl cursor-pointer' onClick={() => {addFollowedGame(game)}} />
                </button>
            )}
       </div>
    );
}
 
export default GameCard;