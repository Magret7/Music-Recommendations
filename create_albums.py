import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
from models import app, db, Albums


cid = '518bb56f9b9f489db20b12846ba33dfb'
secret = 'bd119741e86445aba2cf1306730b09a4'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
token = auth.get_access_token()
spotify = spotipy.Spotify(auth=token)

#TODO
#GET FULL ARTIST LIST WE'RE USING - just the names used in the ie Radiohead - check JACKTEST for example
#OR id's could be fetched if given - take out internal artist id fetching in show_artist_albums
artist_names = ARTIST_LIST #ERROR RIGHT NOW

#Method Definition
def create_album():
    '''
    get and add first album released by the artist (var artist) for every artist in the list artist_names (GLOBAL VAR)
    '''
    for artist in artist_names:
        show_artist_albums(artist) #call method to show every album released by that artist
            

"""SHOWS ARTIST ALBUMS AND ADDS TO DB"""
def show_artist_albums(artist):
    #call spotify to fetch albums by artist's id (input param) - only albums should be fetched
    #LIMIT set to 1 to just get 1 album for speed and simplicity

    # Search for the artist by name to get their Spotify ID
    search_results = sp.search(q='artist:' + artist_name, type='artist', limit=1)
    if not search_results['artists']['items']:
        print(f"Artist {artist_name} not found.")
        return None
    artist_id = search_results['artists']['items'][0]['id']

    # Call Spotify to fetch albums by the artist's ID, but only fetch the first one
    results = sp.artist_albums(artist_id, album_type='album', limit=1)
    if not results['items']:
        print(f"No albums found for {artist_name}.")
        return None

    """
    FETCHING STEP
    GET INFORMATION FOR DB FOR THESE PARAMETERS:
        id
        name
        artist
        artist_id
        image
        info
        tracks
        genres
    """
    # Directly access the first album from the fetched results
    first_album = results['items'][0]
    # Fetch detailed album information using the album ID
    album_details = sp.album(first_album['id'])
    # Extract tracks, artists, and image from the album details
    track_names = [track['name'] for track in album_details['tracks']['items']]
    artist_names = [artist['name'] for artist in album_details['artists']]
    artist_ids = [artist['id'] for artist in album_details['artists']]
    album_image = album_details['images'][0]['url'] if album_details['images'] else None
    # Additional album information and genres
    album_info = {
        'release_date': album_details.get('release_date', 'Unknown release date'),
        'total_tracks': album_details.get('total_tracks', 0)
    }
    artist_info = sp.artist(artist_ids[0])  # Assuming genres are fetched from the first artist
    genres = artist_info.get('genres', [])


    """DATABASE ADDITION: add album to db"""
    newAlbum = Albums(id=first_album['id'], name=first_album['name'], artist=artist_names, artist_id=artist_ids, image=album_image, info=album_info, tracks=track_names, genres=genres)
    db.session.add(newAlbum)
    db.session.commit()


#OTHER RELEVANT METHODS
"""
album(album_id, market=None)
    returns a single album given the album’s ID, URIs or URL
Parameters:
    album_id - the album ID, URI or URL
    market - an ISO 3166-1 alpha-2 country code
"""

"""
album_tracks(album_id, limit=50, offset=0, market=None)
    Get Spotify catalog information about an album’s tracks
Parameters:
    album_id - the album ID, URI or URL
    limit - the number of items to return
    offset - the index of the first item to return
    market - an ISO 3166-1 alpha-2 country code.
"""

"""
albums(albums, market=None)
    returns a list of albums given the album IDs, URIs, or URLs
Parameters:
    albums - a list of album IDs, URIs or URLs
    market - an ISO 3166-1 alpha-2 country code
"""

"""
artist_albums(artist_id, album_type=None, country=None, limit=20, offset=0)
    Get Spotify catalog information about an artist’s albums
Parameters:
    artist_id - the artist ID, URI or URL
    album_type - ‘album’, ‘single’, ‘appears_on’, ‘compilation’
    country - limit the response to one particular country.
    limit - the number of albums to return
    offset - the index of the first album to return
"""


db.drop_all()
db.create_all()

create_album()
