import './GameCard.css';
import '../FontsAndIcons.css';
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
        <div className='game-card-container'>
            <h3>{game}</h3>

            { isFollowed && (
                <div className='game-card-options-container'>
                    
                    <div className='game-card-color-container'>
                        <div className='game-card-color-square-container'
                            onClick={handleClick}
                        >
                            
                            <div className='game-card-color-square' 
                                style={{background: cookies.followedGamesAndColors[game]}}
                            />
                            <span className="material-symbols-outlined">arrow_drop_down</span>
                        </div>
                        {colorPicker.displayColorPicker ? <div className='game-card-color-picker'>
                                <div className='game-card-color-picker-closer' onClick={handleClose} />
                                <SketchPicker 
                                    color={cookies.followedGamesAndColors[game]}
                                    onChangeComplete={handleChange}
                                />
                        </div> : null}
                    </div>
                    
                    <h3 className='game-card-option-btn red-bg'
                        onClick={() => {removeFollowedGame(game)}}
                    >Remove</h3>
                </div>
            )}

            { !isFollowed && (
                <div>
                    <h3 className='game-card-option-btn green-bg'
                        onClick={() => {addFollowedGame(game)}}
                    >Add</h3>
                </div>
            )}
       </div>
    );
}
 
export default GameCard;