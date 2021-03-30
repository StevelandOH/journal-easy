from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avg_rating = db.Column(db.Integer, default=10)

    entries = db.relationship('Entry', back_populates='users')
    ratings = db.relationship('Rating', back_populates='users')
    affirmations = db.relationship('Affirmation', back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "avg_rating": self.avg_rating
        }


class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String(1000))
    response = db.Column(db.String(5000), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='entries')

    def to_dict(self):
        return {
            "id": self.id,
            "prompt": self.prompt,
            "response": self.response,
            "type": self.type,
            "date": self.date,
            "user_id": self.user_id
        }


class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.String(20), nullable=False)

    users = db.relationship('User', back_populates='ratings')

    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "user_id": self.user_id,
            "date": self.date,
        }


class Affirmation(db.Model):
    __tablename__ = 'affirmations'

    id = db.Column(db.Integer, primary_key=True)
    affirmation = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='affirmations')

    def to_dict(self):
        return {
            "id": self.id,
            "affirmations": self.affirmation,
            "user_id": self.user_id
        }
