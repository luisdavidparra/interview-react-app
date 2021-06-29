import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faInfoCircle, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, change }) => {
  return (
    <>
      <div id="mySidenav" className="sidenav bg-primary text-white" style={{ width: isOpen ? "75px" : "0px" }}>
        <button className="closebtn btn my-3 text-danger" onClick={() => change()} style={{ marginRight: "-5px" }}>
          <FontAwesomeIcon icon={faTimes} className="closebtn close" />
        </button>
        <Link to="/" className={isOpen ? "mb-5" : ""} style={{ marginLeft: isOpen ? "-30px" : "" }} title="Home">
          <FontAwesomeIcon icon={faHome} className="fs-2 mx-3" />
        </Link>

        <Link
          to="/list-of-quest"
          className={isOpen ? "mb-5" : ""}
          style={{ marginLeft: isOpen ? "-30px" : "" }}
          title="List of quest"
        >
          <FontAwesomeIcon icon={faList} className="fs-2 mx-3" />
        </Link>
        <Link to="/info" className={isOpen ? "mb-5" : ""} style={{ marginLeft: isOpen ? "-30px" : "" }} title="Info">
          {isOpen === "open" && <span>Info</span>}

          <FontAwesomeIcon icon={faInfoCircle} className="fs-2 mx-3" />
        </Link>
      </div>
      <div className="open">
        <button
          onClick={() => change()}
          className="align-items-center btn btn-secondary d-flex justify-content-center m-2 px-4 py-3 position-absolute"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
