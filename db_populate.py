import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
from models import db
from create_artists import create_artist
from create_albums import create_album
from create_genres import create_genre

#* Set up spotipy variables, tokens, etc.
cid = '518bb56f9b9f489db20b12846ba33dfb'
secret = 'bd119741e86445aba2cf1306730b09a4'
auth_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(auth_manager=auth_manager)


db.drop_all()
db.create_all()

create_artist(sp)
create_album(sp)
create_genre(sp)