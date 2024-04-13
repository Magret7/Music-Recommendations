import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="container-fluid sticky-top bg-white">
            <header className="d-flex flex-wrap align-items-center justify-content-md-between py-2 mb-4 border-bottom border-dark border-1">
                <nav className="navbar sticky-top">
                    <Link to={`/`} className="nav-link link-dark">
                        {/* <div className="navbar-brand"> TODO: What was this doing before?  It doesn't have a closing tag in the header.html*/}
                        <img
                            src={require('../assets/images/music-icon.png')}  // TODO: Why does this need "require" to work?
                            width="45"
                            height="45"
                            className="d-inline-block align-top"
                            alt=""
                        />{" "}
                        <b style={{ fontSize: "1.75rem" }}> MusicRecommendations</b>
                    </Link>
                </nav>
            </header>
        </div>
    );
}
