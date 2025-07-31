from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    movies = db.relationship('Movie', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    genre = db.Column(db.String(100))
    director = db.Column(db.String(100)) 
    platform = db.Column(db.String(100))
    content_type = db.Column(db.String(50)) # 'movie' or 'tv_show'
    episodes_watched = db.Column(db.Integer, default=0) # For TV shows
    status = db.Column(db.String(50)) # 'wishlist', 'watching', 'completed'
    rating = db.Column(db.Integer) # 1-10, nullable
    comments = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'director': self.director,
            'platform': self.platform,
            'content_type': self.content_type,
            'episodes_watched': self.episodes_watched,
            'status': self.status,
            'rating': self.rating,
            'comments': self.comments,
            'user_id': self.user_id
        }
