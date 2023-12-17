import Card from 'react-bootstrap/Card';
import sampleImage from '../../assets/sample_poster_land.jpg';
import './NowPlayingItem.css'
import { useNavigate } from 'react-router';
import placeholderPoster from "../../assets/placeholder_poster_portrait.png";

const NowPlayingItem = ({idMovie, title, imageUrl, releasedDate}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/detail/${idMovie}`);
    }
    let formatedDate = new Date(releasedDate);
    formatedDate = formatedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    return (
        <>
            <Card className='now-playing-container' onClick={handleClick} style={{cursor: 'pointer'}}>
                <Card.Img variant="top" src={process.env.REACT_APP_BASE_URL_IMG_MOVIE + imageUrl} alt='Poster'
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; 
                            currentTarget.src=placeholderPoster;
                          }} />

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{formatedDate}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default NowPlayingItem;