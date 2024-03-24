import Navbar from "./Navbar";
import PatchCard from "./PatchCard";
import { convertDate, sortbyDate } from '../Utils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PulseLoader from "react-spinners/PulseLoader";
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage = ({ cookies }) => {
    const [patchNotes, setPatchNotes] = useState([])
    const [pageSize, setPageSize] = useState(16);
    const [serverError, setServerError] = useState(false);

    const fetchGamePatches = async (game, pageSize) => {
            const { data } = await axios.get(`https://patch-hq-api.onrender.com/patches?game=${game}&pageSize=${pageSize}`)
                .catch((error) => {
                    if (error.request) {
                        setServerError(true);
                        console.error(error.request);
                    }
                });
                
            return data;
    }

    const fetchAllPatches = async (followedGamesObject, pageSize) => {
        if (!followedGamesObject) {
            return
        }

        try {
            const titles = Object.keys(followedGamesObject).map(title => title.replace(/ /g, "-"))
            const results = await Promise.all(titles.map(title => fetchGamePatches(title, pageSize)))
            const notes = results.flat();
            notes.sort(sortbyDate);
            setPatchNotes(notes);
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleScroll = () => {
        setPageSize(pageSize + 8);
        return fetchAllPatches(cookies.followedGamesAndColors, pageSize);
    }

    useEffect(() => {
        fetchAllPatches(cookies.followedGamesAndColors, pageSize)
    }, [cookies.followedGamesAndColors, pageSize])

    return (
        <div className='min-h-[100vh]'>
            <Navbar />
            <div id='patch-cards-container'>
                {((cookies.followedGamesAndColors === undefined) || (Object.keys(cookies.followedGamesAndColors).length === 0)) && (
                    <p id='home-page-no-following-txt' className='text-slate-400 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[60%] text-center'>
                        It seems like you aren't following any games. Head over to the <b>Following</b> tab to get updates on your favorite games!
                    </p>
                )}

                {cookies.followedGamesAndColors && (
                    <InfiniteScroll
                        className='p-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        dataLength={patchNotes.length}
                        next={handleScroll}
                        hasMore={true}
                    >
                        {patchNotes.map(({ url, game, title, date }) => {
                            return <PatchCard 
                                key={url}
                                cookies={cookies} 
                                game={game} 
                                date={convertDate(date)} 
                                title={title} 
                                url={url} 
                            />
                        })}
                    </InfiniteScroll>
                )}

                {cookies.followedGamesAndColors && (
                    ((Object.keys(cookies.followedGamesAndColors).length > 0) && (patchNotes.length === 0 || patchNotes[0] === undefined)) && (
                        (serverError ? 
                            <p id='home-page-error-txt' className='text-slate-400 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[60%] text-center'>
                                Uh-oh! There was error retrieving patch notes. Please refresh the page or try again later.
                            </p>
                            :
                            <div id='home-page-loading-container' className='flex flex-col items-center text-slate-400 fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'>
                                <PulseLoader
                                    color={'#334155'}
                                    loading={true}
                                    size={15}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    speedMultiplier={0.65}
                                />
                            </div> 
                        )         
                    )
                )}
            </div>
        </div>
    );
}
 
export default HomePage;