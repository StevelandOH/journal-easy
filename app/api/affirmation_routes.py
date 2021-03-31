from flask import Blueprint, request, json
from app.models import Affirmation, db, User
from flask_login import current_user


affirmation_routes = Blueprint('affirmations', __name__)


@affirmation_routes.route('/')
def get_affirmations():
    user = current_user.to_dict()
    print(user)
    response = {}
    affirmations = Affirmation.query.filter(
        Affirmation.user_id == user['id']).all()
    for affirmation in affirmations:
        response[affirmation.id] = affirmation.to_dict()
    print(response)
    return response


@affirmation_routes.route('/', methods=['POST'])
def add_affirmation():
    data = request.data
    j = json.loads(data)
    affirmation = Affirmation(
        affirmation=j['affirmation'],
        user_id=j['userId']
    )
    db.session.add(affirmation)
    db.session.commit()
    return affirmation.to_dict()
