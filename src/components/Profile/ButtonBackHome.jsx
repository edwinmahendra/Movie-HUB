import { FaArrowLeft } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const ButtonBackHome = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/");

    return (
        <IconContext.Provider value={{ color: "white", size: "16px", }}>
        <div className="d-flex flex-row">
          <FaArrowLeft onClick={handleClick} className="mt-1"  style={{cursor: 'pointer'}}/>
          <span className="ms-3 text-light" onClick={handleClick} style={{cursor: 'pointer', fontSize: '1rem'}}>Home</span>
        </div>
      </IconContext.Provider>
    );
};

export default ButtonBackHome;