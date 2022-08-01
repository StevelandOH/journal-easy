import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .models.db import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.entry_routes import entry_routes
from .api.rating_routes import rating_routes
from .api.affirmation_routes import affirmation_routes
from .api.edit_user_routes import edit_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__)
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# apply the the seed commands for models from /seeds
app.cli.add_command(seed_commands)
# apply the Config object from config.py to the flask app
app.config.from_object(Config)
# restful routing api file mappers
app.register_blueprint(user_routes, url_prefix='/api/users/')
app.register_blueprint(auth_routes, url_prefix='/api/auth/')
app.register_blueprint(entry_routes, url_prefix='/api/entry/')
app.register_blueprint(rating_routes, url_prefix='/api/rating/')
app.register_blueprint(affirmation_routes, url_prefix='/api/affirmation/')
app.register_blueprint(edit_routes, url_prefix='/api/edit/')
# initialize and migrate the connection between our api and db
db.init_app(app)
Migrate(app, db)
# CORS will help manage the response header configurations providing an extra
#  layer of security
CORS(app)


# these methods will maintain 'http' integrity on browsers that forcibly add
#  an 's'
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
