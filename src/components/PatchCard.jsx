
const PatchCard = ({ cookies, game, date, title, url }) => {
    return (
        <div id='patch-card-container' className='bg-slate-700 rounded-lg w-[300px] mx-auto'>
            <div id='patch-card-header-container' className='p-3 rounded-t-lg flex justify-between' style={{ background: `${cookies.followedGamesAndColors[game]}` }}>
                <div>{game}</div>
                <div>{date}</div>
            </div>
            <div id='patch-card-description-container' className='h-14 p-3 flex justify-center items-center text-center text-slate-50'>
                <a className='text-sm hover:text-cyan-300 hover:underline' href={url} title={title} target='_blank' rel='noreferrer'>{title}</a>
            </div>
        </div>
    );
}
 
export default PatchCard;