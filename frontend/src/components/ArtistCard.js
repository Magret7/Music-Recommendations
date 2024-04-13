import { Outlet, Link } from "react-router-dom";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
                <p className="artistCard--followers">{numberWithCommas(props.followers)} Followers</p>
            </div>
        </div>
    )
}