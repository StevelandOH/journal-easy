from flask.cli import AppGroup
from .users import seed_users, undo_users
from .affirmations import seed_affirmations, undo_affirmations
from .entries import seed_entries, undo_entries
from .ratings import seed_ratings, undo_ratings

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_affirmations()
    seed_entries()
    seed_ratings()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_affirmations()
    undo_entries()
    undo_ratings()
    # Add other undo functions here
