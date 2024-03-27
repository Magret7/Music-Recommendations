import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import json
from models import app, db, Artists, Albums, Genres
from create_artists import create_artist
from create_albums import create_album, query_artist_ids, show_artist_albums
from create_genre import create_genre

# Set up spotipy variables
cid = '743874e5946242aca7a2b78363605dd4'
secret = '4eb091f3739444ae9be89cf86154eb58'
auth_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

db.drop_all()
db.create_all()

create_artist(sp)
create_album(sp)
create_genre(sp)