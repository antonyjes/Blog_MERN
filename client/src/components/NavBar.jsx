import "../styles/NavBar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-home">
      <p className="navbar-brand" onClick={() => navigate("/home")} role="button">
        Blog 1.0
      </p>
      <div className="links-section">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" onClick={() => navigate("/home")} role="button">
              <p className="nav-link">
                Home
              </p>
            </li>
            <li className="nav-item" role="button">
              <p className="nav-link" href="#">
                Favorites
              </p>
            </li>
            <li className="nav-item" role="button">
              <p className="nav-link" href="#">
                Profile
              </p>
            </li>
            <li className="nav-item" role="button">
              <p className="nav-link" href="#">
                Friends
              </p>
            </li>
          </ul>
        </div>

        <button className="btn btn-outline-success" onClick={() => dispatch(setLogout())}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
