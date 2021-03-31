from flask import Blueprint, request, json
from app.models import Entry, db, User
from flask_login import current_user


entry_routes = Blueprint('entries', __name__)


@entry_routes.route('/')
def get_entries():
    user = current_user.to_dict()
    entries = Entry.query.filter(
        Entry.user_id == user['id']).all()
    response = {}
    for entry in entries:
        response[entry.id] = entry.to_dict()
    return response


@entry_routes.route('/', methods=['POST'])
def add_entry():
    user = current_user.to_dict()
    data = request.data
    j = json.loads(data)
    entry = Entry(
        prompt=j['prompt'],
        response=j['data'],
        type=j['type'],
        date=j['date'],
        user_id=user['id']
    )
    db.session.add(entry)
    db.session.commit()
    return entry.to_dict()
