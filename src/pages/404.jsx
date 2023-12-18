import img404 from '../assets/404.png';

const NotFound404 = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={img404} alt="404" style={{marginTop: '8%'}} />
        </div>
    );
};

export default NotFound404;