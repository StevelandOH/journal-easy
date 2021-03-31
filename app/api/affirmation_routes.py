from flask import Blueprint, request, json
from app.models import Affirmation, db, User
from flask_login import current_user


affirmation_routes = Blueprint('affirmations', __name__)


@affirmation_routes.route('/')
def get_affirmations():
    user = current_user.to_dict()
    response = {}
    affirmations = Affirmation.query.filter(
        Affirmation.user_id == user['id']).all()
    for affirmation in affirmations:
        response[affirmation.id] = affirmation.to_dict()
    return response


@affirmation_routes.route('/', methods=['POST'])
def add_affirmation():
    user = current_user.to_dict()
    data = request.data
    print(data, '-------this is my data')
    j = json.loads(data)

    affirmation = Affirmation(
        affirmation=j['affirmation'],
        user_id=user['id']
    )
    db.session.add(affirmation)
    db.session.commit()
    return affirmation.to_dict()


@affirmation_routes.route('/', methods=['DELETE'])
def delete_affirmation():
    user = current_user.to_dict()
    data = request.data
    j = json.loads(data)
    response = {}
    affirmations = Affirmation.query.filter(
        Affirmation.user_id == user['id']).all()
    for affirmation in affirmations:
        print(affirmation.to_dict(), '-----------------')
        if affirmation.id != j['affirmation']['id']:
            response[affirmation.id] = affirmation.to_dict()
        else:
            newAff = affirmation
    db.session.delete(newAff)
    db.session.commit()
    print('this is my response--------------', response)
    return response
