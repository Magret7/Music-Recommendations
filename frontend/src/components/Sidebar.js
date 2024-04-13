import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers, faMicrophone, faCompactDisc, faMusic } from '@fortawesome/free-solid-svg-icons';


export default function Sidebars() {
    return (
        <div className="col-1 p-3 border-end">
            <ul className="nav nav-pills flex-column mb-auto " style={{ fontSize: "1.2rem" }}>
                <li className="nav-item">
                 <Link to={`/`} className="nav-link link-dark" aria-current="page"> <FontAwesomeIcon icon={faHouse}/> Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={`artists`} className="nav-link link-dark" aria-current="page"> <FontAwesomeIcon icon={faMicrophone}/> Artists</Link>
                </li>
                <li className="nav-item">
                    <Link to={`albums`} className="nav-link link-dark" aria-current="page"> <FontAwesomeIcon icon={faCompactDisc}/> Albums</Link>
                </li>
                <li className="nav-item">
                    <Link to={`genres`} className="nav-link link-dark" aria-current="page"> <FontAwesomeIcon icon={faMusic}/> Genres</Link>
                </li>
                <li className="nav-item">
                    <Link to={`about`} className="nav-link link-dark" aria-current="page"> <FontAwesomeIcon icon={faUsers}/> About Us</Link>
                </li>
            </ul>
        </div>
    )
}