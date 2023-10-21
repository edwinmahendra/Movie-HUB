import { FaPencilAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const sampleImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

const ProfilePicture = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/edit-profile-pic");

  return (
    <div className="position-relative"
        style={{width: "max-content"}}
    >
      <img
        src={sampleImage}
        alt="Profile Picture"
        className="rounded-circle border border d-block"
        onClick={handleClick}
      />

      <IconContext.Provider value={{ color: "white", size: "30px", 
        className: "rounded-circle border border position-absolute",
        style:{backgroundColor: "black", padding: "6px", bottom: "8px", right: "24px"}
        }}
        onClick={handleClick}>
        <div>
          <FaPencilAlt onClick={handleClick} />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default ProfilePicture;