import './HomePage.css';
import { patches } from '../AllPatches';
import Navbar from "./Navbar";
import PatchCard from "./PatchCard";
import { convertDate, sortbyDate } from '../Utils';

const HomePage = ({ cookies }) => {

    const listFollowedPatches = (followedGamesObject) => {
        let arr = [];

        Object.entries(followedGamesObject).forEach(([key, _]) => {
            patches[key] && (Object.entries(patches[key]).forEach(([key2, value2]) => {
                arr.push(value2);
            }))
        });

        arr.sort(sortbyDate);

        return arr.map((patch) => {
            return <PatchCard 
                key={patch.url}
                cookies={cookies} 
                game={patch.game} 
                date={convertDate(patch.date)} 
                title={patch.title} 
                url={patch.url} 
            />
        })
    }

    return (
        <div>
            <Navbar />
            <div className='patch-cards-container'>
                {(Object.keys(cookies.followedGamesAndColors).length === 0) && (
                    <p className='home-page-placeholder-txt'>
                        It seems like you aren't following any games. Head over to the <b>Following</b> tab to get updates on your favorite games!
                    </p>
                )}
                {cookies.followedGamesAndColors && (listFollowedPatches(cookies.followedGamesAndColors))}
            </div>
        </div>
    );
}
 
export default HomePage;