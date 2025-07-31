from app import app, db 
from models import User, Movie
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
import datetime

# Secret key for JWT 
app.config['SECRET_KEY'] = 'your_super_secret_key_for_jwt'

# JWT decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing name, email, or password'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User with this email already exists'}), 409

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({'token': token, 'username': user.name, 'user_id': user.id}), 200

@app.route('/api/movies', methods=['POST'])
@token_required
def add_movie(current_user):
    data = request.get_json()
    new_movie = Movie(
        title=data.get('title'),
        director=data.get('director'), 
        genre=data.get('genre'),
        platform=data.get('platform'),
        content_type=data.get('content_type'),
        episodes_watched=data.get('episodes_watched', 0) if data.get('content_type') == 'tv_show' else 0,
        status=data.get('status'),
        rating=data.get('rating') if data.get('status') == 'completed' else None,
        comments=data.get('comments') if data.get('status') == 'completed' else None,
        user=current_user
    )
    db.session.add(new_movie)
    db.session.commit()
    return jsonify({'message': 'Movie added successfully!', 'movie': new_movie.to_dict()}), 201

@app.route('/api/movies', methods=['GET'])
@token_required
def get_movies(current_user):
    movies = Movie.query.filter_by(user_id=current_user.id).all()
    return jsonify([movie.to_dict() for movie in movies]), 200

@app.route('/api/movies/<int:movie_id>', methods=['PUT'])
@token_required
def update_movie(current_user, movie_id):
    movie = Movie.query.filter_by(id=movie_id, user_id=current_user.id).first()
    if not movie:
        return jsonify({'message': 'Movie not found or unauthorized'}), 404

    data = request.get_json()
    movie.title = data.get('title', movie.title)
    movie.director = data.get('director', movie.director) 
    movie.genre = data.get('genre', movie.genre)
    movie.platform = data.get('platform', movie.platform)
    movie.content_type = data.get('content_type', movie.content_type)
    movie.episodes_watched = data.get('episodes_watched', movie.episodes_watched)
    movie.status = data.get('status', movie.status)
    movie.rating = data.get('rating', movie.rating) if movie.status == 'completed' else None
    movie.comments = data.get('comments', movie.comments) if movie.status == 'completed' else None

    db.session.commit()
    return jsonify({'message': 'Movie updated successfully!', 'movie': movie.to_dict()}), 200

@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
@token_required
def delete_movie(current_user, movie_id):
    movie = Movie.query.filter_by(id=movie_id, user_id=current_user.id).first()
    if not movie:
        return jsonify({'message': 'Movie not found or unauthorized'}), 404

    db.session.delete(movie)
    db.session.commit()
    return jsonify({'message': 'Movie deleted successfully!'}), 200
