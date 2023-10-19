import Card from 'react-bootstrap/Card';
import sampleImage from '../../assets/sample_poster_portrait.png';
import './PopularUpcomingItem.css'

const PopularUpcomingItem = () => {
    return (
        <>
            <Card className='popular-container'>
                <Card.Img variant="top" src={sampleImage} alt='Poster' />

                <Card.Body>
                    <Card.Title>One Piece</Card.Title>
                    <Card.Text> Aug 31, 2023 </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default PopularUpcomingItem;