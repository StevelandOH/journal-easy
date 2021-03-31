from flask import Blueprint, request, json
from app.models import Entry, db, User


entry_routes = Blueprint('entries', __name__)


@entry_routes.route('/')
def get_entries(id):
    entries = Entry.query.filter(
        Entry.user_id == id).order_by(Entry.date.desc()).all()
    response = {}
    for entry in entries:
        response[entry.id] = entry.to_dict()
    return response


@entry_routes.route('/', methods=['POST'])
def add_entry():
    data = request.data
    j = json.loads(data)
    entry = Entry(
        prompt=j['prompt'],
        response=j['data'],
        type=j['type'],
        date=j['date'],
        user_id=j['userId']
    )
    db.session.add(entry)
    db.session.commit()
    return entry.to_dict()
