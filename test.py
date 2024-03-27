import os
import sys
import unittest
from models import db, Albums, Artists, Genres

# -----------
# DBTestCases
# -----------

#TODO
#

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
        s = Genres(id='123', name="John Doe", image=image, popularity=popularity, genres=genres,
                                 tracks=tracks, albums=albums, related_artists=related_artists, albums_id=album_ids)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Genres).filter_by(id = '20').one()
        self.assertEqual(str(r.id), '20')

        db.session.query(Genres).filter_by(id = '20').delete()
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