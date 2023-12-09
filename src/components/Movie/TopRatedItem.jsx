import Card from 'react-bootstrap/Card';
import './TopRatedItem.css'
import { useNavigate } from 'react-router';

const TopRatedItem = ({idMovie, title, imageUrl, releasedDate, score}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/detail/${idMovie}`);
    }
    let formatedDate = new Date(releasedDate);
    formatedDate = formatedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    let formatedScore = Number(score * 10);
    formatedScore = formatedScore.toFixed(1);

    return (
        <>
            <Card className='top-rated-container' onClick={handleClick} style={{cursor: 'pointer'}}>
                <Card.Img variant="top" src={process.env.REACT_APP_BASE_URL_IMG_MOVIE + imageUrl} alt='Poster' />

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text id='movie-date'>{formatedDate}</Card.Text>
                    <Card.Text id='movie-score'> <b>{formatedScore}%</b> User Score </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default TopRatedItem;