import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/header.css";

const Header = ({ name }) => {
  const { state, dispatch } = useAppContext();
  // const navigate = useNavigate();
  let home = state.homeActive;
  let survey = state.surveyActive;

  const alternate = () => {
    dispatch({ type: "navigate" });
  };

  const pathname = window.location.pathname;

  return (
    <div className="header">
      <div className="img"> {/*  onClick={() => navigate("/1")}> */}
        <img src="gen/default-monochrome-black.svg" height={80} width={200} alt="ygfytfytt" />

      </div>
      {pathname !== "/Finish" && <nav className="nav">
        <Link
          className={home ? "navActive" : "navHome"}
          to={pathname === "/" ? "/" : "/"}
          onClick={() => {
            if (pathname === "/") {
            } else alternate();
          }}
        >
          Home
        </Link>
        |{" "}
        <Link
          className={survey ? "navActive" : "navSurvey"}
          to={pathname === "/" ? "/" : "/survey"}
        >
          Survey
        </Link>
      </nav>}
    </div>
  );
};

export default Header;
