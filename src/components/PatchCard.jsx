import './PatchCard.css';

const PatchCard = ({ cookies, game, date, title, url }) => {
    return (
        <div className='patch-card-container'>
            <div className='patch-card-header-container'
                style={{ background: `${cookies.followedGamesAndColors[game]}` }}
            >
                <div>{game}</div>
                <div>{date}</div>
            </div>
            <div className='patch-card-description-container'>
                <a href={url} title={title}>{title}</a>
            </div>
        </div>
    );
}
 
export default PatchCard;