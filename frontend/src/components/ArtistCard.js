import { Outlet, Link } from "react-router-dom";

export default function ArtistCard(props) {
    return (
        <div className='artistCard'>
            <Link to={`/artist/${props.name}`}>
                <img src={props.img} alt={props.name} className="artistCard--img" />
            </Link>
            <div className="artistCard--info">
                <Link to={`/artist/${props.name}`} className="nav-link link-dark">
                    <p className="artistCard--name">{props.name}</p>
                </Link>
                {/* <p className="artistCard--followers">{props.followers} Followers</p> */}
            </div>
        </div>
    )
}