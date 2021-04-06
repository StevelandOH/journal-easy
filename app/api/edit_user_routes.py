from flask import Blueprint, request, json
from app.models import db, User
from flask_login import current_user


edit_routes = Blueprint('edits', __name__)


@edit_routes.route('/name', methods=['PUT'])
def update_name():
    user = current_user.to_dict()
    user_model = User.query.filter(User.id == user['id']).first()
    data = request.data
    j = json.loads(data)
    user_model.name = j
    db.session.add(user_model)
    db.session.commit()
    return user_model.to_dict()


@edit_routes.route('/username', methods=['PUT'])
def updateUsername():
    user = current_user.to_dict()
    user_model = User.query.filter(User.id == user['id']).first()
    data = request.data
    j = json.loads(data)
    user_model.username = j
    db.session.add(user_model)
    db.session.commit()
    return user_model.to_dict()
