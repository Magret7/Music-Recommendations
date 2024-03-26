import { Outlet, Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="col-1 p-3 border-end">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to={`/`} className="nav-link link-dark" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={`artists`} className="nav-link link-dark" aria-current="page">Artists</Link>
                </li>
                <li className="nav-item">
                    <Link to={`genres`} className="nav-link link-dark" aria-current="page">Genres</Link>
                </li>
                <li className="nav-item">
                    <Link to={`albums`} className="nav-link link-dark" aria-current="page">Albums</Link>
                </li>
                <li className="nav-item">
                    <Link to={`about`} className="nav-link link-dark" aria-current="page">About Us</Link>
                </li>
            </ul>
        </div>
    )
}