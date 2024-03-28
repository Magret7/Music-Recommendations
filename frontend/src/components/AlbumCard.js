import { Outlet, Link } from "react-router-dom";

export default function AlbumCard(props) {
    return (
        <div className='albumCard'>
            <Link to={`/album/${props.name}`}>
                <img src={props.img} alt={props.name} className="albumCard--img" />
            </Link>
            <div className="albumCard--info">
                <Link to={`/album/${props.name}`} className="nav-link link-dark">
                    <span className="albumCard--name">{props.name}</span>
                </Link>
                <span>{props.releaseYear}</span>
            </div>
            <div className="albumCard--artists">
                {props.artists.map(artist => <span><Link to={`/artist/${artist}`} className="nav-link link-dark" style={{ marginRight: 10 }}>{artist}</Link></span>)}
            </div>
        </div>
    )
}