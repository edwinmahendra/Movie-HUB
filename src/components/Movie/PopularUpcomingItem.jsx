import Card from 'react-bootstrap/Card';
import sampleImage from '../../assets/sample_poster_portrait.png';
import './PopularUpcomingItem.css'
import { useNavigate } from 'react-router';

const PopularUpcomingItem = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/detail');
    }

    return (
        <>
            <Card className='popular-container' onClick={handleClick}  style={{cursor: 'pointer'}}>
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