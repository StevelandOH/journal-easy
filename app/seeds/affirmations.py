from app.models import db, Affirmation


def seed_affirmations():

    affirmations = [
        Affirmation(affirmation='My dreams are happening now', user_id=1),
        Affirmation(affirmation='Opportunity comes easily to me', user_id=1),
        Affirmation(affirmation='I excel in everything I do', user_id=1),
        Affirmation(
            affirmation='My mind is filled with love and gratitude',
            user_id=1),
        Affirmation(
            affirmation='I only attract the best situations', user_id=1),
        Affirmation(affirmation='I choose happines in abundance', user_id=1)
    ]

    for affirmation in affirmations:
        db.session.add(affirmation)

    db.session.commit()


def undo_affirmations():
    db.session.execute('TRUNCATE affirmations CASCADE;')
    db.session.commit()
