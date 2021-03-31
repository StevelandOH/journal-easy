from flask import Blueprint, request, json
from app.models import Affirmation, db, User


affirmation_routes = Blueprint('affirmations', __name__)


@affirmation_routes.route('/')
def get_affirmations(id):
    affirmations = Affirmation.query.filter(Affirmation.user_id == id).all()
    response = {}
    for affirmation in affirmations:
        response[affirmation.id] = affirmation.to_dict()
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
