from flask import Blueprint, request, json
from app.models import Rating, db, User


rating_routes = Blueprint('ratings', __name__)


@rating_routes.route('/')
def get_ratings(id):
    ratings = Rating.query.filter(
        Rating.user_id == id).order_by(Rating.date.desc()).all()
    response = {}
    for rating in ratings:
        response[rating.id] = rating.to_dict()
    return response


@rating_routes.route('/', methods=['POST'])
def add_rating():
    data = request.data
    j = json.loads(data)
    rating = Rating(
        rating=j['rating'],
        date=j['date'],
        user_id=j['userId']
    )
    db.session.add(rating)
    db.session.commit()
    return rating.to_dict()
