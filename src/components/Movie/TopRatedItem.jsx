import Card from 'react-bootstrap/Card';
import sampleImage from '../../assets/sample_poster_portrait.png';
import './TopRatedItem.css'

const PopularUpcomingItem = () => {
    return (
        <>
            <Card className='top-rated-container'>
                <Card.Img variant="top" src={sampleImage} alt='Poster' />

                <Card.Body>
                    <Card.Title>The Shawsanks Redemption</Card.Title>
                    <Card.Text id='movie-date'> Aug 31, 2023 </Card.Text>
                    <Card.Text id='movie-score'> <b>87%</b> User Score </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default PopularUpcomingItem;