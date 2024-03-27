import os
import sys
import unittest
from models import db, Albums, Artists, Genres

# -----------
# DBTestCases
# -----------

class DBTestCases(unittest.TestCase):
    """ARTISTS"""
    def test_artists_insert_1(self):
        s = Artists(id='123', name="John Doe", image=image, popularity=popularity, genres=genres,
                                 tracks=tracks, albums=albums, related_artists=related_artists, albums_id=album_ids)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Artists).filter_by(id = '20').one()
        self.assertEqual(str(r.id), '20')

        db.session.query(Artists).filter_by(id = '20').delete()
        db.session.commit()


    """GENRES"""
    def test_genres_insert_1(self):
        s = Genres(name='test_genre', artists=artists, artist_ids=artist_ids, albums=albums, 
                    album_ids = album_ids, tracks=tracks)
        db.session.add(s)
        db.session.commit()

        r = db.session.query(Genres).filter_by(name='test_genre').one()
        self.assertEqual(str(r.name), 'test_genre')

        db.session.query(Genres).filter_by(name='test_genre').delete()
        db.session.commit()
    
    def test_genres_delete_1(self):
        s = Genres(name='test_genre', artists=artists, artist_ids=artist_ids, albums=albums, 
                    album_ids = album_ids, tracks=tracks)
        db.session.add(s)
        db.session.commit()

        db.session.query(Genres).filter_by(name='test_genre').delete()
        r = db.session.query(Genres).filter_by(name='test_genre').one()
        self.assertEqual(str(r.name), None)
        
        db.session.commit()

    """ALBUMS"""
    #INSERTION
    def test_albums_insert_1(self):
        s = Albums(id='123', name="John Doe", image=image, popularity=popularity, genres=genres,
                                 tracks=tracks, albums=albums, related_artists=related_artists, albums_id=album_ids)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Albums).filter_by(id = '20').one()
        self.assertEqual(str(r.id), '20')

        db.session.query(Albums).filter_by(id = '20').delete()
        db.session.commit()


if __name__ == '__main__':
    unittest.main()
