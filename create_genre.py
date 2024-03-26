import spotipy as sp
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import json
from models import app, db, Genres

cid = '743874e5946242aca7a2b78363605dd4'
secret = '4eb091f3739444ae9be89cf86154eb58'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
token = auth.get_access_token()
spotify = sp.Spotify(auth=token)

def create_genre():
    genres_list = sp.recommendation_genre_seeds()['genres'][:100]
    for genre in genres_list:
        name = genre

        related_artists = sp.search(q='genre:' + genre, type='artist', limit=5)['artists']['items']
        artist_names = [artist['name'] for artist in related_artists]
        artist_ids = [artist['id'] for artist in related_artists]

        albums = sp.search(q='genre:' + genre, type='album', limit=5)['albums']['items']
        album_names = [album['name'] for album in albums]
        album_ids = [album['id'] for album in albums]

        tracks = sp.search(q='genre:' + genre, type='track', limit=5)['tracks']['items']
        track_names = [track['name'] for track in tracks]

        newGenre = Genres(name = name, artist = artist_names, artist_id = artist_ids, albums = album_names, albums_id = album_ids, tracks = track_names)
        db.session.add(newGenre)
        db.session.commit

db.drop_all()
db.create_all()

create_genre()