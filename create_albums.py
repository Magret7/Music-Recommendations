import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import json
from models import app, db, Albums


cid = '518bb56f9b9f489db20b12846ba33dfb'
secret = 'bd119741e86445aba2cf1306730b09a4'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
token = auth.get_access_token()
spotify = spotipy.Spotify(auth=token)

#TODO
#GET FULL ARTIST LIST WE'RE USING


#INTENTION - get all the albums released by ALL the artists we have

#global variables
artist_names = [artist['name'] for artist in FULL_ARTIST_LIST]
artist_ids = [artist['id'] for artist in FULL_ARTIST_LIST]

#Method Definition
def create_album():
    '''
    list the names of all the albums released by the artist (var artist)
    '''
    for artist in artist_names:
        show_artist_albums(artist) #call method to show every album released by that artist
            

def show_artist_albums(artist):
    albums = []
    results = sp.artist_albums(artist['id'], album_type='album')
    albums.extend(results['items'])
    while results['next']:
        results = sp.next(results)
        albums.extend(results['items'])
    seen = set()  # to avoid dupes
    albums.sort(key=lambda album: album['name'].lower())
    for album in albums:
        name = album['name']
        if name not in seen:
            seen.add(name)

            #ADD THE ALBUM to DB
            newAlbum = Albums(name = name, artist = artist_names, artist_id = artist_ids, tracks = track_names)

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
