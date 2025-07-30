from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy without an app context initially
db = SQLAlchemy()

def init_db(app):
    """
    Initializes the SQLAlchemy database with the Flask app and creates tables.
    This function should be called once with the Flask application instance.
    """
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///moviemate.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    # Push an application context to ensure db.create_all() works correctly
    # when run directly (e.g., via `flask run`).
    with app.app_context():
        db.create_all() # This creates the tables if they don't already exist