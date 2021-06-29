import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navv">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary row">
        <div className="title">
          <span>InterviewApp</span>
        </div>
        <div className="container-fluid d-flex justify-content-around px-5 mx-5">
          <Link to="/" className="text-white mb-4" title="Home">
            <FontAwesomeIcon icon={faHome} className="fs-2" />
          </Link>
          <Link to="/list-of-quest" className="text-white mb-4" title="List of quest">
            <FontAwesomeIcon icon={faList} className="fs-2" />
          </Link>
          <Link to="/info" className="text-white mb-4" title="Info">
            <FontAwesomeIcon icon={faInfoCircle} className="fs-2" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
