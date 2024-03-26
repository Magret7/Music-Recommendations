export default function Sidebar() {
    return (
        <div className="col-1 p-3 border-end">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link link-dark" aria-current="page">
                        Home(TBD)
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/artists}" className="nav-link link-dark">
                        Artists
                    </a>
                </li>
                <li className="nav-item">
                    <a href="{{url_for('showGenres')}}" className="nav-link link-dark">
                        Genres
                    </a>
                </li>
                <li className="nav-item">
                    <a href="{{url_for('showAlbums')}}" className="nav-link link-dark">
                        Albums
                    </a>
                </li>
                <li className="nav-item">
                    <a href="{{url_for('about')}}" className="nav-link link-dark">
                        About Us
                    </a>
                </li>
            </ul>
        </div>
    )
}