import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-home">
      <p class="navbar-brand" href="#">
        Navbar
      </p>
      <div className="links-section">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <p class="nav-link" href="#">
                Home
              </p>
            </li>
            <li class="nav-item">
              <p class="nav-link" href="#">
                Favorites
              </p>
            </li>
            <li class="nav-item">
              <p class="nav-link" href="#">
                Profile
              </p>
            </li>
            <li class="nav-item">
              <p class="nav-link" href="#">
                Friends
              </p>
            </li>
          </ul>
        </div>

        <button class="btn btn-outline-success" type="submit">
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
