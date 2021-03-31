from flask import Blueprint, request, json
from app.models import Rating, db, User
from flask_login import current_user


rating_routes = Blueprint('ratings', __name__)


@rating_routes.route('/')
def get_ratings():
    user = current_user.to_dict()
    ratings = Rating.query.filter(
        Rating.user_id == user['id']).all()
    response = {}
    for rating in ratings:
        response[rating.id] = rating.to_dict()
    return response


@rating_routes.route('/', methods=['POST'])
def add_rating():
    user = current_user.to_dict()
    data = request.data
    j = json.loads(data)
    rating = Rating(
        rating=j['rating'],
        date=j['date'],
        user_id=user['id']
    )
    db.session.add(rating)
    db.session.commit()
    return rating.to_dict()
