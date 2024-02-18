
const PatchCard = ({ cookies, game, date, title, url }) => {
    return (
        <div id='patch-card-container' className='bg-slate-200 border-2 border-slate-300'>
            <div id='patch-card-header-container' className='p-3 font-bold flex justify-between' style={{ background: `${cookies.followedGamesAndColors[game]}` }}>
                <div>{game}</div>
                <div>{date}</div>
            </div>
            <div id='patch-card-description-container' className='h-14 p-3 flex justify-center items-center text-center'>
                <a className='text-blue-600' href={url} title={title}>{title}</a>
            </div>
        </div>
    );
}
 
export default PatchCard;