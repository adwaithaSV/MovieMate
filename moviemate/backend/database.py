from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def init_db(app):
    """
    Initializes the SQLAlchemy database with the Flask app and creates tables.
    This function should be called once with the Flask application instance.
    """
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///moviemate.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all() 
