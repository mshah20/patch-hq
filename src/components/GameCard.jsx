import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { defaultColors } from '../DefaultColors';

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

    const addFollowedGame = (game) => {
        setCookie('followedGamesAndColors', {...cookies.followedGamesAndColors, [`${game}`]: defaultColors[game]})
    }

    const removeFollowedGame = (game) => {
        let followedGamesAndColors = cookies.followedGamesAndColors;
        delete followedGamesAndColors[game];
        setCookie('followedGamesAndColors', followedGamesAndColors);
    }

    return (
        <div id='game-card-container' className='bg-slate-50 text-black rounded-lg flex justify-between items-center px-4 mb-5 w-[60vw] h-14'>
            <h3>{game}</h3>

            { isFollowed && (
                <div id='game-card-options-container' className='flex'>
                    
                    <div id='game-card-color-container'>
                        <div id='game-card-color-square-container' title='Game Color' className='flex cursor-pointer items-center select-none' onClick={handleClick}>
                            <div id='game-card-color-square' className='h-8 w-8 rounded-full border-[2px] border-slate-300' style={{background: cookies.followedGamesAndColors[game]}} />
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
                    
                    <h3 id='game-card-remove-btn' className='py-1 px-3 ml-4 rounded-sm cursor-pointer select-none text-white bg-red-400' onClick={() => {removeFollowedGame(game)}}>
                        Remove
                    </h3>
                </div>
            )}

            { !isFollowed && (
                <div>
                    <h3 id='game-card-add-btn' className='py-1 px-2 rounded-sm cursor-pointer select-none text-white bg-green-400' onClick={() => {addFollowedGame(game)}}
                    >Add</h3>
                </div>
            )}
       </div>
    );
}
 
export default GameCard;