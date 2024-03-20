from flask import Flask, render_template, request, redirect, url_for, jsonify
# from flask_paginate import Pagination, get_page_parameter
from models import app, db, Artists, Albums, Genres


# Main Componets: name, info, tracks, albums, genres, v RelatedArtists
artists = [{'name': 'SZA','image': 'Place Image Here', 'info': 'Solána Imani Rowe, known professionally as SZA, is an American singer-songwriter. She first gained recognition through her self-released extended plays, See.SZA.Run and S, which helped her become the first female artist to sign with Top Dawg Entertainment.', 'tracks': ['Kill Bill', 'All the Stars', 'Snooze', 'Broken Clocks'], 'albums': ['Ctrl'], 'genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'], 'RelatedArtists': ['H.E.R', 'Ella Mai', 'Franck Ocean', 'Miguel', 'Jhené Aiko']},
           {'name': 'J. Cole', 'image': 'Place Image Here','info': 'Jermaine Lamarr Cole is an American rapper and record producer. Born on a military base in Germany and raised in Fayetteville, North Carolina, Cole initially gained attention as a rapper following the release of his debut mixtape, The Come Up, in early 2007. ', 'tracks': ['She Knows', 'Power Trip', 'No Role Modelz', 'Work Out', 'Under the Sun'], 'albums': ['2014 Forest Hills Drive'], 'genres': ['Hip Hop', 'Rap'], 'RelatedArtists': ['Bas', 'Cozz', 'JID', 'Joey Badsa$$', 'Kendrick Lamar', 'JAY-Z']},
           {'name': 'Ariana Grande', 'image': 'Place Image Here','info': 'Ariana Grande-Butera is an American singer, songwriter, and actress. Regarded as a pop culture icon, she is noted as an influential figure in popular music and as one of the most prominent vocalists of her generation, for her four-octave vocal range and signature whistle register.', 'tracks': ['7 Rings', 'Side to Side', 'thank u, next', '34+35', 'The Way'], 'albums': ['Sweetener'], 'genres': ['Pop', 'Contemporary R&B'], 'RelatedArtists': ['Doja Cat', 'SZA', 'Sabrina Carpenter', 'Victoria Monét', 'Olivia Rodrigo']},
          ]

# Main Componets: name, info, artist, albums, tracks
genres = [{'name': 'R&B', 'info': 'Rhythm and blues, frequently abbreviated as R&B or R''n''B, is a genre of popular music that originated within African-American communities in the 1940s. The term was originally used by record companies to describe recordings marketed predominantly to African Americans, at a time when "rocking, jazz based music ... [with a] heavy, insistent beat" was becoming more popular', 'artists': ['SZA'], 'albums': ['Ctrl'],'tracks': ['Pick Up Your Feelings', 'Let\'s Get Married', 'Adorn']},
          {'name': 'Pop', 'info': 'Pop music is an abbreviation of the word "popular". Its a contemporary form of music that appeals to a very wide audience. It often includes a danceable tempo, easy to remember lyrics, and simple notation. Pop music is commonly found on mainstream radio stations and across a range of countries and cultures.','artists': ['Ariana Grande'], 'albums': ['Sweetener'], 'tracks': ['Water', 'Paint The Town Red', 'Feather']},
          {'name': 'Hip Hop', 'info': 'Hip-hop or hip hop, also known as rap, and formerly known as disco rap, is a genre of popular music that originated in the early 1970s by African Americans and Caribbean immigrants in the Bronx, a borough of New York City. Hip-hop consist of stylized rhythmic music (usually built around drum beats) that often accompanies rapping, a rhythmic delivery of poetic speech.', 'artists': ['J. Cole'], 'albums': ['2014 Forest Hills Drive'], 'tracks': ['HISS', 'Lovin On Me', 'Let Me Calm Down']},
          {'name': 'Neo Soul', 'info': 'Neo soul (sometimes called progressive soul) is a genre of popular music. Heavily based in soul music, neo soul is distinguished by a less conventional sound than its contemporary R&B counterpart, with incorporated elements ranging from funk, jazz fusion, hip hop, and African music to pop, rock, and electronic music.', 'artists': ['SZA'], 'albums': ['Ctrl'], 'tracks': ['When I\'m in Your Arms', 'Cruisin\'', 'On & On']},
          {'name': 'Rap', 'info': 'Rap is an artistic form of vocal delivery and emotive expression that incorporates "rhyme, rhythmic speech, and [commonly] street vernacular". The components of rap include "content" (what is being said, e.g., lyrics), "flow" (rhythm, rhyme), and "delivery" (cadence, tone).', 'artists': ['J. Cole'], 'albums': ['2014 Forest Hills Drive'], 'tracks': ['Like What', 'Yeah Glo!', 'Never Lose Me']},
          {'name': 'Contemporary R&B', 'info': 'Contemporary R&B is a popular music genre that combines rhythm and blues with elements of pop, soul, funk, hip hop, and electronic music.', 'artists': ['SZA'], 'albums': ['Ctrl'],'tracks': ['Orbit', 'Ocean', 'Footsteps']}
         ]

# Main Componets: name, info, artist, tracks, genres
albums = [{'name': 'Ctrl', 'image': 'Place Image Here', 'artist': ['SZA'], 'info': 'Ctrl (pronounced "control") is the debut studio album by American singer SZA. It was released through Top Dawg Entertainment and RCA Records on June 9, 2017', 'tracks': ['Supermodle', 'Drew Barrymore', 'Go Gina', 'Anything', 'Pretty Little Bird', '...'], 'genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul']},
          {'name': '2014 Forest Hills Drive', 'image': 'Place Image Here', 'artist': ['J. Cole'], 'info': '2014 Forest Hills Drive is the third studio album by American rapper J. Cole. It was released on December 9, 2014, by ByStorm Entertainment', 'tracks': ['Intro', 'January 28th','Wet Dreamz', '03\' Adolescence', 'A Tale od 2 Citiez', 'Fire Sqaud', '...'], 'genres': ['Hip Hop', 'Rap']},
          {'name': 'Sweetener', 'image': 'Place Image Here', 'artist': ['Ariana Grande'], 'info': 'Sweetener is the fourth studio album by American singer Ariana Grande. It was released on August 17, 2018, through Republic Records.', 'tracks': ['sweetener', 'blazed', 'successful', 'raindrops (an angel cried)', 'R.E.M', 'everytime'], 'genres': ['Pop', 'Contemporary R&B']}
         ]

# Main Componets: name, info, related_Artists, related_Albums, related_Songs
relatedArtists = [{'name': 'H.E.R', 'Biography': 'H.E.R', 'Songs': [], 'Albums': [], 'Genres': ['Contemporary R&B'], 'RelatedArtists': ['SZA']},
                  {'name': '2014 Forest Hills dive', 'Biography': 'Kendrick Lamar', 'Songs': [], 'Albums': [], 'Genres': ['Hip Hop', 'Rap'], 'RelatedArtists': ['J. Cole']},
                  {'name': 'Doja Cat', 'Biography': 'Doja Cat', 'Songs': [], 'Albums': [], 'Genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'], 'RelatedArtists': ['SZA']}
                 ]

@app.route('/artists/JSON')
def bookJSON():
    r = json.dumps(artists)
    return r


# TODO: Flesh out home screen with content once we decide what to display there
# @app.route('/')
# def home():
#     return render_template('home.html')


# @app.route('/unitTests')
# def unittests():
#     return render_template('unitTests.html')


# @app.route('/api')
# def api():
#     return render_template('api.html')


# Showing the About Page
@app.route('/about')
def about():
    return render_template('about.html')



# @app.route('/')
# Showing A List Artist In Database
@app.route('/artists/')
def showArtists():
    return render_template('showAllArtists.html', artists = artists)
	# artists_list = db.session.query(Artists).all()
	# return render_template('showAllArtists.html', artists_list = artists_list)


# Showing A List Albums In Database
@app.route('/albums/')
def showAlbums():
    if albums:
        return render_template('showAllAlbums.html', albums = albums)
    	# albums_list = db.session.query(musicdb).all()
	    # return render_template('showAllAlbums.html', albums_list = albums_list)
    else:
        return "Albums not found", 404
    
# Showing A List Genres In Database
@app.route('/genres/')
def showGenres():
    if genres:
        return render_template('showAllGenres.html', genres = genres)
        # genres_list = db.session.query(Genres).all()
	    # return render_template('showAllAlbums.html', genres_list = genres_list)
    else:
        return "Genres not found", 404

# Showing all Artists related on another Artists
@app.route('/<artist_name>/relatedArtists')
def relatedArtists(artist_name):
    artist = None
    for a in artists:
        if a['name'] == artist_name:
            artist = a
            break
    if artist:
        return render_template('relatedArtists.html', artist = artist, relatedArtists = relatedArtists)
    else:
        return "Artist not found", 404
    
# Showing A Single Genre In Database
@app.route('/genre/<genre_name>/',  methods=['GET', 'POST'])
def showGenre(genre_name):
    genre = None
    for g in genres:
        if g['name'] == genre_name:
            genre = g
            break
    if genre:
        return render_template('showGenre.html', genre = genre)
    else:
        return "Genre not found", 404
    
# Showing A Single Album In Database
@app.route('/album/<album_name>/',  methods=['GET', 'POST'])
def showAlbum(album_name):
    album = None
    for a in albums:
        if a['name'] == album_name:
            album = a
            break
    if album:
        return render_template('showAlbum.html', album = album)
    else:
        return "Genre not found", 404

# Showing A Single Artist In Database
@app.route('/artist/<artist_name>/',  methods=['GET', 'POST'])
def showArtist(artist_name):
    artist = None
    for a in artists:
        if a['name'] == artist_name:
            artist = a
            break
    if artist:
        return render_template('showArtist.html', artist = artist)
    else:
        return "Artist not found", 404

if __name__ == "__main__":
    app.debug = True
    app.run()
