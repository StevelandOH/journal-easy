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
    user_model = User.query.filter(User.id == user['id']).first()
    ratings = Rating.query.filter(
        Rating.user_id == user['id']).all()
    data = request.data
    j = json.loads(data)
    if len(ratings) == 0:
        user_model.avg_rating = int(j['rating'])
    else:
        total = user['avg_rating']*len(ratings)
        new_total = total+int(j['rating'])
        length = len(ratings)+1

        result = new_total/length
        user_model.avg_rating = int(result)
    rating = Rating(
        rating=j['rating'],
        date=j['date'],
        user_id=user['id']
    )
    db.session.add(user_model)
    db.session.add(rating)
    db.session.commit()
    return rating.to_dict()
