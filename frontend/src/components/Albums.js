import { Outlet, Link } from "react-router-dom";

export default function Albums() {
    const albums = [{ 'name': 'Ctrl', 'image': "https://i.scdn.co/image/ab676161000051740895066d172e1f51f520bc65", 'artist': ['SZA'], 'info': 'Ctrl (pronounced "control") is the debut studio album by American singer SZA. It was released through Top Dawg Entertainment and RCA Records on June 9, 2017', 'tracks': ['Supermodle', 'Drew Barrymore', 'Go Gina', 'Anything', 'Pretty Little Bird', '...'], 'genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'] },
    { 'name': '2014 Forest Hills Drive', 'image': "https://i.scdn.co/image/ab67616100005174add503b411a712e277895c8a", 'artist': ['J. Cole'], 'info': '2014 Forest Hills Drive is the third studio album by American rapper J. Cole. It was released on December 9, 2014, by ByStorm Entertainment', 'tracks': ['Intro', 'January 28th', 'Wet Dreamz', '03\' Adolescence', 'A Tale od 2 Citiez', 'Fire Sqaud', '...'], 'genres': ['Hip Hop', 'Rap'] },
    { 'name': 'Sweetener', 'image': "https://i.scdn.co/image/ab6761610000517440b5c07ab77b6b1a9075fdc0", 'artist': ['Ariana Grande'], 'info': 'Sweetener is the fourth studio album by American singer Ariana Grande. It was released on August 17, 2018, through Republic Records.', 'tracks': ['sweetener', 'blazed', 'successful', 'raindrops (an angel cried)', 'R.E.M', 'everytime'], 'genres': ['Pop', 'Contemporary R&B'] }
    ]

    const albumsMap = albums.map(album => {
        return (
            <>
                <div className="column">
                    <table>
                        <tr>
                            <th>{album.name}</th>
                        </tr>

                        <tr>
                            <td>
                                <b>Artists: </b>
                                {album.artist.map(artist => <Link to={`/artist/${artist}`}>{artist}</Link>)}
                            </td>
                        </tr>

                        <tr>
                            <td><b>Information: </b> {album.info}</td>
                        </tr>

                        <tr>
                            <td>
                                <b>Album Tracks:</b><br />
                                {album.tracks.map(track => (<>{track} <br /></>))}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Genres of Albums: </b>
                                {album.genres.map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre}</Link>)}
                            </td>
                        </tr>
                    </table>
                </div>
            </>
        )
    })

    return (
        <>
            <h1 style={{ textAlign: "center" }}>All Albums</h1>
            {albums.length > 0 ? albumsMap : <p>No Albums exist</p>}
        </>
    )
}