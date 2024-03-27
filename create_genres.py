import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import json
from models import app, db, Genres

cid = '518bb56f9b9f489db20b12846ba33dfb'
secret = 'bd119741e86445aba2cf1306730b09a4'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
token = auth.get_access_token()
spotify = spotipy.Spotify(auth=token)

def create_genre(sp):
    '''
    gets artists and tracks for 100 genres
    '''
    # get list of genres 
    genres_list = sp.recommendation_genre_seeds()['genres'][:100]
    for genre in genres_list:
        # name
        name = genre

        # artists
        related_artists = sp.search(q='genre:' + genre, type='artist', limit=5)['artists']['items']
        artists = [artist['name'] for artist in related_artists]
        artist_ids = [artist['id'] for artist in related_artists]

        # albums
        related_albums = [sp.search(q='artist:' + artist['name'], type='album')['albums']['items'][0] for artist in related_artists]
        albums = [album['name'] for album in related_albums]
        album_ids = [album['id'] for album in related_albums]

        # tracks
        tracks = sp.search(q='genre:' + genre, type='track', limit=5)['tracks']['items']
        track_names = [track['name'] for track in tracks]

        # create genre instance and add to db
        newGenre = Genres(name = name, artists = artists, artist_ids = artist_ids, albums = albums, album_ids = album_ids, tracks = track_names)
        db.session.add(newGenre)
        db.session.commit()

db.drop_all()
db.create_all()

create_genre(sp)