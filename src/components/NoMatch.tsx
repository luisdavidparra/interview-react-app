import { Link, useLocation } from "react-router-dom";

const NoMatch = () => {
  let location = useLocation();
  return (
    <>
      <h4>
        No match for <b>{location.pathname}</b>
      </h4>
      <Link to="/">Go back Home</Link>
    </>
  );
};

export default NoMatch;