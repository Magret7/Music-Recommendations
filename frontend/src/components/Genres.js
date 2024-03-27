import { Outlet, Link } from "react-router-dom";

export default function Genres() {
    const genres = [{ 'name': 'R&B', 'info': `Rhythm and blues, frequently abbreviated as R&B or R''n''B, is a genre of popular music that originated within African-American communities in the 1940s. The term was originally used by record companies to describe recordings marketed predominantly to African Americans, at a time when "rocking, jazz based music ... [with a] heavy, insistent beat" was becoming more popular`, 'artists': ['SZA'], 'albums': ['Ctrl'], 'tracks': ['Pick Up Your Feelings', 'Let\'s Get Married', 'Adorn'] },
    { 'name': 'Pop', 'info': 'Pop music is an abbreviation of the word "popular". Its a contemporary form of music that appeals to a very wide audience. It often includes a danceable tempo, easy to remember lyrics, and simple notation. Pop music is commonly found on mainstream radio stations and across a range of countries and cultures.', 'artists': ['Ariana Grande', 'SZA'], 'albums': ['Sweetener'], 'tracks': ['Water', 'Paint The Town Red', 'Feather'] },
    { 'name': 'Hip Hop', 'info': 'Hip-hop or hip hop, also known as rap, and formerly known as disco rap, is a genre of popular music that originated in the early 1970s by African Americans and Caribbean immigrants in the Bronx, a borough of New York City. Hip-hop consist of stylized rhythmic music (usually built around drum beats) that often accompanies rapping, a rhythmic delivery of poetic speech.', 'artists': ['J. Cole'], 'albums': ['2014 Forest Hills Drive'], 'tracks': ['HISS', 'Lovin On Me', 'Let Me Calm Down'] },
    { 'name': 'Neo Soul', 'info': 'Neo soul (sometimes called progressive soul) is a genre of popular music. Heavily based in soul music, neo soul is distinguished by a less conventional sound than its contemporary R&B counterpart, with incorporated elements ranging from funk, jazz fusion, hip hop, and African music to pop, rock, and electronic music.', 'artists': ['SZA'], 'albums': ['Ctrl'], 'tracks': ['When I\'m in Your Arms', 'Cruisin\'', 'On & On'] },
    { 'name': 'Rap', 'info': 'Rap is an artistic form of vocal delivery and emotive expression that incorporates "rhyme, rhythmic speech, and [commonly] street vernacular". The components of rap include "content" (what is being said, e.g., lyrics), "flow" (rhythm, rhyme), and "delivery" (cadence, tone).', 'artists': ['J. Cole'], 'albums': ['2014 Forest Hills Drive'], 'tracks': ['Like What', 'Yeah Glo!', 'Never Lose Me'] },
    { 'name': 'Contemporary R&B', 'info': 'Contemporary R&B is a popular music genre that combines rhythm and blues with elements of pop, soul, funk, hip hop, and electronic music.', 'artists': ['SZA'], 'albums': ['Ctrl'], 'tracks': ['Orbit', 'Ocean', 'Footsteps'] }
    ]

    const genreMap = genres.map(genre => {
        return (
            <div className="column">   {/* <!-- TODO: Why does this make it display well? --> */}
                <table>
                    <tr>
                        <th>{genre.name}</th>
                    </tr>

                    <tr>
                        <td><b>Information: </b> {genre.info}</td>
                    </tr>

                    <tr>
                        <td>
                            <b>Artists: </b>
                            {genre.artists.map(artist => <Link to={`/artist/${artist}`} style={{ marginRight: 10 }}>{artist}</Link>)}

                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Albums: </b>
                            {genre.albums.map(album => <Link to={`/album/${album}`}>{album}</Link>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Related Songs: </b><br />
                            {genre.tracks.map(track => (<>{track} <br /></>))}
                        </td>
                    </tr>
                </table>
            </div>
        )
    })

    return (
        <>
            {genreMap}
        </>
    )
}