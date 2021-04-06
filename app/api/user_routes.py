from flask import Blueprint, jsonify, request, json
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# @user_routes.route('/name', methods='PUT')
# @login_required
# def update():
#     user = current_user.to_dict()
#     user_model = User.query.filter(User.id == user['id']).first()
#     data = request.data
#     j = json.loads(data)
#     print('hey---------------', j)


# @user_routes.route('/username', methods='PUT')
# @login_required
# def update():
#     pass


# @user_routes.route('/password', methods='PUT')
# @login_required
# def update():
#     pass
