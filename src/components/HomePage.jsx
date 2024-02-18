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
            <div id='patch-cards-container' className='p-12 grid grid-cols-4 gap-6 justify-center'>
                {((cookies.followedGamesAndColors === undefined) || (Object.keys(cookies.followedGamesAndColors).length === 0)) && (
                    <p id='home-page-placeholder-txt' className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-slate-400 w-[60%] text-center'>
                        It seems like you aren't following any games. Head over to the <b>Following</b> tab to get updates on your favorite games!
                    </p>
                )}
                {cookies.followedGamesAndColors && (listFollowedPatches(cookies.followedGamesAndColors))}
            </div>
        </div>
    );
}
 
export default HomePage;