import Card from 'react-bootstrap/Card';
import sampleImage from '../../assets/sample_poster_land.jpg';
import './NowPlayingItem.css'
import { useNavigate } from 'react-router';

const NowPlayingItem = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/detail');
    }
    return (
        <>
            <Card className='now-playing-container' onClick={handleClick} style={{cursor: 'pointer'}}>
                <Card.Img variant="top" src={sampleImage} alt='Poster' />

                <Card.Body>
                    <Card.Title>One Piece</Card.Title>
                    <Card.Text> Aug 31, 2023 </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default NowPlayingItem;