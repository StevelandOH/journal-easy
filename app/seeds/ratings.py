from app.models import db, Rating


def seed_ratings():

    ratings = [
        Rating(rating=5, date='3/25/2021', user_id=1),
        Rating(rating=6, date='3/26/2021', user_id=1),
        Rating(rating=4, date='3/27/2021', user_id=1),
        Rating(rating=8, date='3/28/2021', user_id=1),
        Rating(rating=6, date='3/29/2021', user_id=1),
        Rating(rating=3, date='3/30/2021', user_id=1),
        Rating(rating=9, date='3/31/2021', user_id=1),
        Rating(rating=8, date='4/1/2021', user_id=1),
        Rating(rating=7, date='4/2/2021', user_id=1),
        Rating(rating=8, date='4/3/2021', user_id=1),
        Rating(rating=8, date='4/4/2021', user_id=1),
        Rating(rating=9, date='4/5/2021', user_id=1),
        Rating(rating=6, date='4/6/2021', user_id=1),
        Rating(rating=5, date='4/7/2021', user_id=1),
        Rating(rating=4, date='4/8/2021', user_id=1),
        Rating(rating=1, date='4/9/2021', user_id=1),
        Rating(rating=8, date='4/10/2021', user_id=1),
        Rating(rating=8, date='4/11/2021', user_id=1),
        Rating(rating=7, date='4/12/2021', user_id=1),
        Rating(rating=6, date='4/13/2021', user_id=1),
        Rating(rating=9, date='4/14/21', user_id=1),
        Rating(rating=8, date='4/15/21', user_id=1),
        Rating(rating=4, date='4/16/21', user_id=1),
        Rating(rating=5, date='4/17/21', user_id=1),
        Rating(rating=7, date='4/18/21', user_id=1),
        Rating(rating=6, date='4/19/21', user_id=1),
        Rating(rating=3, date='4/20/21', user_id=1),
        Rating(rating=9, date='4/21/21', user_id=1),
        Rating(rating=9, date='4/22/21', user_id=1),
    ]

    for rating in ratings:
        db.session.add(rating)

    db.session.commit()


def undo_ratings():
    db.session.execute('TRUNCATE ratings;')
    db.session.commit()
