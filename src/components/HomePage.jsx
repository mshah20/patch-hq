import Navbar from "./Navbar";
import PatchCard from "./PatchCard";
import { convertDate, sortbyDate } from '../Utils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchGamePatches = async (game) => {
    try {
        const { data } = await axios.get(`https://patch-hq-api.onrender.com/patches?game=${game}`);
        return data;
    }
    catch (e) {
        console.error(e);
    }
}

const HomePage = ({ cookies }) => {
    const [patchNotes, setPatchNotes] = useState([])

    const fetchAllPatches = async (followedGamesObject) => {
        if (!followedGamesObject) {
            return
        }

        try {
            const titles = Object.keys(followedGamesObject).map(title => title.replace(/ /g, "-"))
            const results = await Promise.all(titles.map(title => fetchGamePatches(title)))
            const notes = results.flat();
            notes.sort(sortbyDate);
            setPatchNotes(notes);
        }
        catch (e) {
            console.error(e);
        }
    }

    const listFollowedPatches = () => {
        try {
            return patchNotes.map(({ url, game, title, date }) => {
                return <PatchCard 
                    key={url}
                    cookies={cookies} 
                    game={game} 
                    date={convertDate(date)} 
                    title={title} 
                    url={url} 
                />
            })
        }
        catch (e) {
            console.error(e);
        }
        
    }

    useEffect(() => {
        fetchAllPatches(cookies.followedGamesAndColors)
    }, [cookies.followedGamesAndColors])

    return (
        <div className='min-h-[100vh]'>
            <Navbar />
            <div id='patch-cards-container' className='p-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {((cookies.followedGamesAndColors === undefined) || (Object.keys(cookies.followedGamesAndColors).length === 0)) && (
                    <p id='home-page-placeholder-txt' className='text-slate-400 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[60%] text-center'>
                        It seems like you aren't following any games. Head over to the <b>Following</b> tab to get updates on your favorite games!
                    </p>
                )}
                {cookies.followedGamesAndColors && (
                    listFollowedPatches(cookies.followedGamesAndColors)
                )}
                {cookies.followedGamesAndColors && (
                    ((Object.keys(cookies.followedGamesAndColors).length > 0) && (patchNotes.length === 0 || patchNotes[0] === undefined)) && (
                        <p id='home-page-placeholder-txt' className='text-slate-400 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[60%] text-center'>
                            Uh-oh! There was error retrieving patch notes. Please refresh the page or try again later.
                        </p>                    
                    )
                )}
            </div>
        </div>
    );
}
 
export default HomePage;