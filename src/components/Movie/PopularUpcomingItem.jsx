import Card from 'react-bootstrap/Card';
import './PopularUpcomingItem.css'
import { useNavigate } from 'react-router';
import placeholderPoster from "../../assets/placeholder_poster_portrait.png";

const PopularUpcomingItem = ({idMovie, title, imageUrl, releasedDate}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/detail/${idMovie}`);
    }
    let formatedDate = new Date(releasedDate);
    formatedDate = formatedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});

    return (
        <>
            <Card className='popular-container' onClick={handleClick}  style={{cursor: 'pointer'}}>
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

export default PopularUpcomingItem;